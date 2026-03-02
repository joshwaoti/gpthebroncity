import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUpcoming = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("events")
            .withIndex("by_status", (q) => q.eq("status", "upcoming"))
            .order("asc")
            .collect();
    },
});

export const list = query({
    args: { status: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (args.status) {
            return await ctx.db.query("events")
                .withIndex("by_status", (sq) => sq.eq("status", args.status as any))
                .order("desc")
                .collect();
        }
        return await ctx.db.query("events").order("desc").collect();
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        description: v.optional(v.string()),
        date: v.string(),
        location: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        category: v.optional(v.string()),
        createdBy: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("events", {
            ...args,
            status: "upcoming",
        });
    },
});

export const remove = mutation({
    args: { id: v.id("events") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
