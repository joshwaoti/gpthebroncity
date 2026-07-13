import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { logAction, requirePermission } from "./lib";

export const getActive = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "projects:manage");
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
        await requirePermission(ctx, "projects:manage");
        const all = await ctx.db.query("projects").collect();
        const totalGoal = all.reduce((sum, p) => sum + (p.goalAmount ?? 0), 0);
        return {
            totalRaised: all.reduce((sum, p) => sum + (p.value ?? 0), 0),
            totalGoal: totalGoal > 0 ? totalGoal : 100000000,
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

export const getAllAdmin = query({
    args: {},
    handler: async (ctx) => {
        await requirePermission(ctx, "projects:manage");
        return await ctx.db.query("projects").order("desc").collect();
    },
});

export const getById = query({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "projects:manage");
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        status: v.union(v.literal("active"), v.literal("completed"), v.literal("on_hold")),
        value: v.optional(v.number()),
        goalAmount: v.optional(v.number()),
        date: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { identity } = await requirePermission(ctx, "projects:manage");

        if (!args.name.trim()) throw new Error("Project name is required.");

        const id = await ctx.db.insert("projects", {
            ...args,
            createdBy: identity.subject,
        });
        await logAction(ctx, { action: "create", entityType: "Project", entityId: id, details: args.name });
        return id;
    },
});

export const update = mutation({
    args: {
        id: v.id("projects"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        status: v.optional(v.union(v.literal("active"), v.literal("completed"), v.literal("on_hold"))),
        value: v.optional(v.number()),
        goalAmount: v.optional(v.number()),
        date: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "projects:manage");
        const { id, ...fields } = args;
        const existing = await ctx.db.get(id);
        if (!existing) throw new Error("Project not found.");
        await ctx.db.patch(id, fields);
        await logAction(ctx, { action: "update", entityType: "Project", entityId: id, details: fields.name ?? existing.name });
    },
});

export const remove = mutation({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "projects:manage");
        const existing = await ctx.db.get(args.id);
        if (!existing) return;
        await ctx.db.delete(args.id);
        await logAction(ctx, { action: "delete", entityType: "Project", entityId: args.id, details: existing.name });
    },
});
