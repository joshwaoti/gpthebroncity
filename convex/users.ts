import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { isAdminRole, logAction, requireAuth, requirePermission, requireSuperAdmin } from "./lib";

const VALID_ROLES = ["super_admin", "editor", "ministry_leader", "finance_admin", "user"] as const;
const roleValidator = v.union(
    v.literal("super_admin"),
    v.literal("editor"),
    v.literal("ministry_leader"),
    v.literal("finance_admin"),
    v.literal("user"),
);

function normalizeRole(role: string | undefined) {
    return VALID_ROLES.includes(role as (typeof VALID_ROLES)[number])
        ? role as (typeof VALID_ROLES)[number]
        : undefined;
}

export const getByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "users:manage");
        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();
    },
});

// Return only the caller's own profile and effective role. The admin shell uses
// this instead of trusting client-visible Clerk metadata.
export const getCurrent = query({
    args: {},
    handler: async (ctx) => {
        const identity = await requireAuth(ctx);
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique();
        return {
            clerkId: identity.subject,
            name: user?.name ?? identity.name ?? identity.givenName,
            email: user?.email ?? identity.email,
            role: isAdminRole(user?.role) ? user.role : "user",
            needsRoleBootstrap: user?.role === undefined,
        };
    },
});

/**
 * One-time migration for the original pre-RBAC owner record. New accounts are
 * always created with the regular-user role, so only the oldest legacy record
 * with no role can use this path, and only while no super admin exists.
 */
export const bootstrapLegacyOwner = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await requireAuth(ctx);
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique();
        if (!user || user.role !== undefined) return false;

        const users = await ctx.db.query("users").collect();
        if (users.some((candidate) => candidate.role === "super_admin")) {
            throw new Error("A super administrator already exists.");
        }
        const oldestUser = users.sort((a, b) => a._creationTime - b._creationTime)[0];
        if (!oldestUser || oldestUser._id !== user._id) {
            throw new Error("Only the original legacy owner can initialize the super admin role.");
        }

        await ctx.db.patch(user._id, { role: "super_admin" });
        await logAction(ctx, {
            action: "update",
            entityType: "User Role",
            entityId: user._id,
            details: "Initialized the original owner as super_admin during the RBAC migration",
        });
        return true;
    },
});

// Trusted authorization bridge for Convex actions, which do not have direct
// database access. The calling action must first verify its Clerk identity.
export const authorizeMediaAction = internalQuery({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();
        if (!user || (user.role !== "super_admin" && user.role !== "editor")) {
            throw new Error("Forbidden: your role cannot synchronize sermons.");
        }
        return user;
    },
});

export const upsertFromClerk = internalMutation({
    args: {
        clerkId: v.string(),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        role: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();
        const role = normalizeRole(args.role);

        if (existingUser) {
            await ctx.db.patch(existingUser._id, {
                name: args.name,
                email: args.email,
                imageUrl: args.imageUrl,
                role: role ?? existingUser.role ?? "user",
            });
            return existingUser._id;
        }

        return await ctx.db.insert("users", {
            clerkId: args.clerkId,
            name: args.name,
            email: args.email,
            imageUrl: args.imageUrl,
            role: role ?? "user",
            lastLogin: Date.now(),
        });
    },
});

export const deleteFromClerk = internalMutation({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();
        if (user) await ctx.db.delete(user._id);
    },
});

export const list = query({
    args: {},
    handler: async (ctx) => {
        await requirePermission(ctx, "users:manage");
        return await ctx.db.query("users").collect();
    },
});

export const updateRole = mutation({
    args: { id: v.id("users"), role: roleValidator },
    handler: async (ctx, args) => {
        const { identity } = await requireSuperAdmin(ctx);
        const target = await ctx.db.get(args.id);
        if (!target) throw new Error("User not found.");
        if (target.clerkId === identity.subject) {
            throw new Error("You cannot change your own role.");
        }
        await ctx.db.patch(args.id, { role: args.role });
        await logAction(ctx, {
            action: "update",
            entityType: "User Role",
            entityId: args.id,
            details: `${target.name ?? target.email ?? target.clerkId}: ${target.role ?? "unassigned"} -> ${args.role}`,
        });
    },
});
