import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getSetting = query({
    args: { key: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("siteSettings")
            .withIndex("by_key", (q) => q.eq("key", args.key))
            .unique();
    },
});

export const updateSetting = mutation({
    args: { key: v.string(), value: v.any(), description: v.optional(v.string()), updatedBy: v.string() },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("siteSettings")
            .withIndex("by_key", (q) => q.eq("key", args.key))
            .unique();

        if (existing) {
            await ctx.db.patch(existing._id, {
                value: args.value,
                description: args.description,
                updatedBy: args.updatedBy,
            });
        } else {
            await ctx.db.insert("siteSettings", {
                key: args.key,
                value: args.value,
                description: args.description,
                updatedBy: args.updatedBy,
            });
        }
    },
});

export const getAllMinistries = query({
    args: {},
    handler: async (ctx) => {
        const doc = await ctx.db.query("siteSettings").withIndex("by_key", (q) => q.eq("key", "ministries")).unique();
        return (doc?.value as any[]) || [];
    },
});

export const upsertMinistry = mutation({
    args: { ministry: v.any() },
    handler: async (ctx, args) => {
        // Implement full logic later, dummy for now to resolve error
    },
});

export const deleteMinistry = mutation({
    args: { id: v.string() },
    handler: async (ctx) => { },
});

export const getAllGivingMethods = query({
    args: {},
    handler: async (ctx) => {
        const doc = await ctx.db.query("siteSettings").withIndex("by_key", (q) => q.eq("key", "givingMethods")).unique();
        return (doc?.value as any[]) || [];
    },
});

export const upsertGivingMethod = mutation({
    args: { method: v.any() },
    handler: async (ctx, args) => { },
});
