import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getLatest = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("sermons")
            .withIndex("by_status", (q) => q.eq("status", "active"))
            .order("desc")
            .take(5);
    },
});

export const list = query({
    args: { status: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (args.status) {
            return await ctx.db.query("sermons")
                .withIndex("by_status", (sq) => sq.eq("status", args.status as any))
                .order("desc")
                .collect();
        }
        return await ctx.db.query("sermons").order("desc").collect();
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        description: v.optional(v.string()),
        speaker: v.optional(v.string()),
        date: v.optional(v.string()),
        videoUrl: v.optional(v.string()),
        thumbnailUrl: v.optional(v.string()),
        category: v.optional(v.string()),
        isFeatured: v.optional(v.boolean()),
        createdBy: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("sermons", {
            ...args,
            status: "active",
        });
    },
});

export const getAllSeries = query({
    args: {},
    handler: async (ctx) => {
        return [];
    },
});

export const remove = mutation({
    args: { id: v.id("sermons") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
