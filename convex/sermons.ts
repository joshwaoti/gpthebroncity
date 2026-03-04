import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
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

export const listPaginated = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        // Since we don't have an index on date, but _creationTime is usually correlated with date for new items
        // Wait, for imported older YouTube videos, _creationTime is today. 
        // We will just order by _creationTime for now, which Convex does natively fast for pagination.
        // Actually the best is to query backwards by index or creation time. 
        // However, we recently added the videos. If the user wants to truly order by published date from YT,
        // we should add an index on "date" in schema if we wanted to paginate.
        // For now we'll paginate naturally by descending _creationTime which is fast.
        return await ctx.db.query("sermons")
            .withIndex("by_status", (q) => q.eq("status", "active"))
            .order("desc")
            .paginate(args.paginationOpts);
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
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated call to create sermon");

        return await ctx.db.insert("sermons", {
            ...args,
            createdBy: identity.subject,
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
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated call to remove sermon");

        await ctx.db.delete(args.id);
    },
});

export const get = query({
    args: { id: v.id("sermons") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const update = mutation({
    args: {
        id: v.id("sermons"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        speaker: v.optional(v.string()),
        date: v.optional(v.string()),
        videoUrl: v.optional(v.string()),
        thumbnailUrl: v.optional(v.string()),
        category: v.optional(v.string()),
        isFeatured: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated call to update sermon");

        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
    },
});
