import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const stamp = mutation({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("blogPosts")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
        if (existing) {
            await ctx.db.patch(existing._id, { content: "TIMESTAMP-" + Date.now() });
            return "Updated with timestamp";
        }
        return "Not found";
    },
});

export const checkAuth = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        return {
            isAuthenticated: !!identity,
            tokenIdentifier: identity?.tokenIdentifier,
            email: identity?.email,
            issuer: identity?.issuer,
        };
    },
});
