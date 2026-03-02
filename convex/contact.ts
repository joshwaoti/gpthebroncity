import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("contacts", {
            ...args,
            status: "new",
            timestamp: Date.now(),
        });
    },
});

export const getNewCount = query({
    args: {},
    handler: async (ctx) => {
        const newItems = await ctx.db
            .query("contacts")
            .withIndex("by_status", (q) => q.eq("status", "new"))
            .collect();
        return newItems.length;
    },
});

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("contacts").order("desc").collect();
    },
});

export const updateStatus = mutation({
    args: { id: v.id("contacts"), status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")) },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status });
    },
});

export const remove = mutation({
    args: { id: v.id("contacts") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
