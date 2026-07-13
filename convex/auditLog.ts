import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { logAction, requireAdmin, requirePermission, requireSuperAdmin } from "./lib";

// Database changes write their audit entry in the same transaction. These
// narrow mutations cover lifecycle events and trusted Convex actions.
export const recordClientEvent = mutation({
    args: {
        action: v.union(v.literal("login"), v.literal("logout"), v.literal("view")),
        sessionId: v.string(),
        path: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);
        const sessionId = args.sessionId.trim().slice(0, 256);
        if (!sessionId) throw new Error("A session identifier is required.");

        if (args.action === "view") {
            const path = args.path?.trim();
            if (!path?.startsWith("/admin") || path.length > 500) {
                throw new Error("Invalid admin page path.");
            }
            await logAction(ctx, { action: "view", entityType: "Admin Page", entityId: path, details: path });
            return;
        }

        const existing = await ctx.db
            .query("auditLog")
            .withIndex("by_entity", (q) => q.eq("entityType", "Admin Session").eq("entityId", sessionId))
            .filter((q) => q.eq(q.field("action"), args.action))
            .first();
        if (existing) return;

        await logAction(ctx, {
            action: args.action,
            entityType: "Admin Session",
            entityId: sessionId,
            details: args.action === "login" ? "Signed in to the admin portal" : "Signed out of the admin portal",
        });

        if (args.action === "login") {
            const identity = await ctx.auth.getUserIdentity();
            if (identity) {
                const user = await ctx.db
                    .query("users")
                    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
                    .unique();
                if (user) await ctx.db.patch(user._id, { lastLogin: Date.now() });
            }
        }
    },
});

export const recordInvitation = mutation({
    args: { invitationId: v.string(), email: v.string(), role: v.string() },
    handler: async (ctx, args) => {
        await requireSuperAdmin(ctx);
        await logAction(ctx, {
            action: "invite",
            entityType: "User Invitation",
            entityId: args.invitationId.slice(0, 256),
            details: `${args.email.trim().toLowerCase().slice(0, 320)} invited as ${args.role.slice(0, 64)}`,
        });
    },
});

export const writeFromAction = internalMutation({
    args: {
        action: v.union(v.literal("sync"), v.literal("create"), v.literal("update")),
        entityType: v.string(),
        entityId: v.optional(v.string()),
        userId: v.string(),
        userName: v.optional(v.string()),
        userEmail: v.optional(v.string()),
        actorRole: v.optional(v.string()),
        details: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("auditLog", {
            ...args,
            entityType: args.entityType.slice(0, 128),
            entityId: args.entityId?.slice(0, 256),
            details: args.details?.replace(/[\r\n\t]+/g, " ").trim().slice(0, 1000),
            timestamp: Date.now(),
        });
    },
});

export const getAll = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "audit:view");
        const limit = Math.max(1, Math.min(args.limit ?? 50, 500));
        return await ctx.db.query("auditLog").withIndex("by_timestamp").order("desc").take(limit);
    },
});

export const getLatest = query({
    args: {},
    handler: async (ctx) => {
        await requirePermission(ctx, "audit:view");
        return await ctx.db.query("auditLog").withIndex("by_timestamp").order("desc").take(50);
    },
});
