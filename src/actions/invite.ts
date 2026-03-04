"use server";

import { clerkClient, auth } from "@clerk/nextjs/server";

export async function inviteAdminUser(emailAddress: string, role: string = "user") {
    try {
        const { userId } = await auth();

        if (!userId) {
            return { success: false, error: "Unauthorized" };
        }

        // Verify the existing user is an admin by grabbing their details (optional but good practice)
        const client = await clerkClient();
        const currentUser = await client.users.getUser(userId);
        const currentUserRole = currentUser.publicMetadata?.role as string;

        if (currentUserRole !== "super_admin") {
            return { success: false, error: "Only super administrators can invite new users." };
        }

        const invitation = await client.invitations.createInvitation({
            emailAddress,
            publicMetadata: { role },
            redirectUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/admin/login",
            ignoreExisting: true, // If they already have an account this returns success
        });

        return { success: true, invitationId: invitation.id };
    } catch (error: any) {
        console.error("Failed to crate invitation:", error);
        return { success: false, error: error.errors?.[0]?.message || error.message || "Failed to invite user." };
    }
}
