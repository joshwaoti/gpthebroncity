import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const log = mutation({
    args: {
        action: v.string(),
        entityType: v.string(),
        entityId: v.optional(v.string()),
        userId: v.string(),
        userName: v.optional(v.string()),
        userEmail: v.optional(v.string()),
        details: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("auditLog", {
            ...args,
            timestamp: Date.now(),
        });
    },
});

export const getAll = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        return await ctx.db.query("auditLog").order("desc").take(args.limit ?? 50);
    },
});

export const getLatest = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("auditLog").order("desc").take(50);
    },
});
