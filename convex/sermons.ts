import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

export const getLatest = query({
    args: {},
    handler: async (ctx) => {
        const sermons = await ctx.db
            .query("sermons")
            .withIndex("by_status", (q) => q.eq("status", "active"))
            .collect();
        
        // Sort by date field (most recent first)
        return sermons
            .filter(s => s.date)
            .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
            .slice(0, 5);
    },
});

export const listPaginated = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        const result = await ctx.db.query("sermons")
            .withIndex("by_status", (q) => q.eq("status", "active"))
            .order("desc")
            .paginate(args.paginationOpts);
        
        // Re-sort the page results by date (most recent first)
        const sortedPage = result.page.sort((a, b) => 
            new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
        );
        
        return {
            ...result,
            page: sortedPage,
        };
    },
});

export const list = query({
    args: { status: v.optional(v.string()) },
    handler: async (ctx, args) => {
        let sermons;
        if (args.status) {
            sermons = await ctx.db.query("sermons")
                .withIndex("by_status", (sq) => sq.eq("status", args.status as any))
                .order("desc")
                .collect();
        } else {
            sermons = await ctx.db.query("sermons").order("desc").collect();
        }
        // Sort by date (most recent first)
        return sermons.sort((a, b) => 
            new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
        );
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
