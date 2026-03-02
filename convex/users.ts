import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get user by Clerk ID
export const getByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();
    },
});

// Create or update user from Clerk — bare minimum
export const createUserFromClerk = mutation({
    args: {
        clerkId: v.string(),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (existingUser) {
            await ctx.db.patch(existingUser._id, {
                name: args.name,
                email: args.email,
                imageUrl: args.imageUrl,
                lastLogin: Date.now(),
            });
            return existingUser._id;
        }

        return await ctx.db.insert("users", {
            clerkId: args.clerkId,
            name: args.name,
            email: args.email,
            imageUrl: args.imageUrl,
            lastLogin: Date.now(),
        });
    },
});

// List all users
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").collect();
    },
});

export const updateRole = mutation({
    args: { id: v.id("users"), role: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { role: args.role });
    },
});
