import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getLatest = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("blogPosts")
            .withIndex("by_status", (q) => q.eq("status", "published"))
            .order("desc")
            .take(args.limit ?? 5);
    },
});

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("blogPosts").order("desc").collect();
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        content: v.string(),
        author: v.optional(v.string()),
        publishDate: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        excerpt: v.optional(v.string()),
        slug: v.string(),
        status: v.union(v.literal("published"), v.literal("draft")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated call to create blog post");

        return await ctx.db.insert("blogPosts", {
            ...args,
            createdBy: identity.subject,
        });
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("blogPosts")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();
    },
});

export const remove = mutation({
    args: { id: v.id("blogPosts") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated call to remove blog post");

        await ctx.db.delete(args.id);
    },
});
