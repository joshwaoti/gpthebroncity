import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { logAction, requireAdmin, requirePermission } from "./lib";

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
        await requirePermission(ctx, "content:manage");
        return await ctx.db.query("blogPosts").order("desc").collect();
    },
});

export const count = query({
    args: {},
    handler: async (ctx) => {
        await requireAdmin(ctx);
        const posts = await ctx.db.query("blogPosts").collect();
        return posts.length;
    },
});

export const listPaginated = query({
    args: {
        paginationOpts: v.any(),
        status: v.optional(v.union(v.literal("published"), v.literal("draft"))),
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        if (args.status !== "published") {
            await requirePermission(ctx, "content:manage");
        }
        const { status, category, paginationOpts } = args;
        let q;

        if (status && category && category !== "All") {
            q = ctx.db
                .query("blogPosts")
                .withIndex("by_category", (q) => q.eq("category", category))
                .filter((q) => q.eq(q.field("status"), status));
        } else if (status) {
            q = ctx.db
                .query("blogPosts")
                .withIndex("by_status", (q) => q.eq("status", status));
        } else if (category && category !== "All") {
            q = ctx.db
                .query("blogPosts")
                .withIndex("by_category", (q) => q.eq("category", category));
        } else {
            q = ctx.db.query("blogPosts");
        }

        return await q.order("desc").paginate(paginationOpts);
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

export const getById = query({
    args: { id: v.id("blogPosts") },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "content:manage");
        return await ctx.db.get(args.id);
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
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { identity } = await requirePermission(ctx, "content:manage");

        if (!args.title.trim()) throw new Error("Title is required.");
        if (!args.slug.trim()) throw new Error("Slug is required.");

        const duplicate = await ctx.db
            .query("blogPosts")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();
        if (duplicate) throw new Error(`A post with the slug "${args.slug}" already exists.`);

        const id = await ctx.db.insert("blogPosts", {
            ...args,
            createdBy: identity.subject,
        });
        await logAction(ctx, {
            action: args.status === "published" ? "publish" : "create",
            entityType: "Blog Post",
            entityId: id,
            details: args.title,
        });
        return id;
    },
});

export const update = mutation({
    args: {
        id: v.id("blogPosts"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        author: v.optional(v.string()),
        publishDate: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        excerpt: v.optional(v.string()),
        slug: v.optional(v.string()),
        status: v.optional(v.union(v.literal("published"), v.literal("draft"))),
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "content:manage");
        const { id, ...fields } = args;

        const existing = await ctx.db.get(id);
        if (!existing) throw new Error("Blog post not found.");

        if (fields.slug && fields.slug !== existing.slug) {
            const duplicate = await ctx.db
                .query("blogPosts")
                .withIndex("by_slug", (q) => q.eq("slug", fields.slug!))
                .unique();
            if (duplicate) throw new Error(`A post with the slug "${fields.slug}" already exists.`);
        }

        await ctx.db.patch(id, fields);
        await logAction(ctx, {
            action: "update",
            entityType: "Blog Post",
            entityId: id,
            details: fields.title ?? existing.title,
        });
    },
});

export const remove = mutation({
    args: { id: v.id("blogPosts") },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "content:manage");
        const existing = await ctx.db.get(args.id);
        if (!existing) return;
        await ctx.db.delete(args.id);
        await logAction(ctx, {
            action: "delete",
            entityType: "Blog Post",
            entityId: args.id,
            details: existing.title,
        });
    },
});
