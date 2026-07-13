"use server";

import { clerkClient, auth } from "@clerk/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { headers } from "next/headers";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";

const VALID_ROLES = ["super_admin", "editor", "ministry_leader", "finance_admin", "user"] as const;
type UserRole = (typeof VALID_ROLES)[number];

function isUserRole(role: string): role is UserRole {
    return (VALID_ROLES as readonly string[]).includes(role);
}

async function getSignInRedirectUrl(): Promise<string> {
    const configured = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;
    if (configured?.startsWith("http")) return configured;

    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "https";
    if (host) return `${proto}://${host}/admin/login`;
    return "http://localhost:3000/admin/login";
}

async function getVerifiedSuperAdmin() {
    const authState = await auth();
    if (!authState.userId) throw new Error("Unauthorized");

    const token = await authState.getToken({ template: "convex" });
    if (!token) throw new Error("Unable to verify admin authorization.");

    const client = await clerkClient();
    const convexUser = await fetchQuery(api.users.getCurrent, {}, { token });
    if (convexUser.role !== "super_admin") {
        throw new Error("Your admin role is not synchronized. Access was denied.");
    }

    return { client, token, userId: authState.userId };
}

export async function inviteAdminUser(emailAddress: string, role: string = "user") {
    try {
        const email = emailAddress.trim().toLowerCase();
        if (!email || email.length > 320) return { success: false, error: "A valid email is required." };
        if (!isUserRole(role)) return { success: false, error: "Invalid role." };

        const { client, token } = await getVerifiedSuperAdmin();
        const invitation = await client.invitations.createInvitation({
            emailAddress: email,
            publicMetadata: { role },
            redirectUrl: await getSignInRedirectUrl(),
        });

        try {
            await fetchMutation(api.auditLog.recordInvitation, {
                invitationId: invitation.id,
                email,
                role,
            }, { token });
        } catch (auditError) {
            await client.invitations.revokeInvitation(invitation.id);
            throw new Error(`Invitation was rolled back because its audit record failed: ${auditError instanceof Error ? auditError.message : "unknown error"}`);
        }

        return { success: true, invitationId: invitation.id };
    } catch (error: unknown) {
        console.error("Failed to create invitation:", error);
        const clerkError = error as { errors?: Array<{ message?: string }> };
        return {
            success: false,
            error: clerkError.errors?.[0]?.message || (error instanceof Error ? error.message : "Failed to invite user."),
        };
    }
}

/**
 * Change Clerk and Convex together. If the audited Convex update fails, Clerk
 * metadata is restored so authorization stores cannot silently diverge.
 */
export async function changeAdminUserRole(
    targetUserId: Id<"users">,
    targetClerkId: string,
    role: string,
) {
    try {
        if (!isUserRole(role)) return { success: false, error: "Invalid role." };
        const { client, token, userId } = await getVerifiedSuperAdmin();
        if (targetClerkId === userId) return { success: false, error: "You cannot change your own role." };

        const targetUser = await client.users.getUser(targetClerkId);
        const previousMetadata = targetUser.publicMetadata;
        await client.users.updateUserMetadata(targetClerkId, {
            publicMetadata: { ...previousMetadata, role },
        });

        try {
            await fetchMutation(api.users.updateRole, { id: targetUserId, role }, { token });
        } catch (convexError) {
            await client.users.updateUserMetadata(targetClerkId, { publicMetadata: previousMetadata });
            throw new Error(`Role update was rolled back: ${convexError instanceof Error ? convexError.message : "audit update failed"}`);
        }

        return { success: true };
    } catch (error: unknown) {
        console.error("Failed to update user role:", error);
        const clerkError = error as { errors?: Array<{ message?: string }> };
        return {
            success: false,
            error: clerkError.errors?.[0]?.message || (error instanceof Error ? error.message : "Failed to update role."),
        };
    }
}
