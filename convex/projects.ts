import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getActive = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("projects")
            .withIndex("by_status", (q) => q.eq("status", "active"))
            .order("desc")
            .take(args.limit ?? 5);
    },
});

export const getTotals = query({
    args: {},
    handler: async (ctx) => {
        const all = await ctx.db.query("projects").collect();
        return {
            totalRaised: all.reduce((sum, p) => sum + (p.value ?? 0), 0),
            totalGoal: 100000000,
            projectCount: all.length,
        };
    },
});

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("projects").order("desc").collect();
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        status: v.union(v.literal("active"), v.literal("completed"), v.literal("on_hold")),
        value: v.optional(v.number()),
        date: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated call to create project");

        return await ctx.db.insert("projects", {
            ...args,
            createdBy: identity.subject,
        });
    },
});

export const getAllAdmin = list;

export const remove = mutation({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated call to remove project");

        await ctx.db.delete(args.id);
    },
});
