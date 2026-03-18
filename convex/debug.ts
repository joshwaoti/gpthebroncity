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

export const testMutation = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        return {
            isAuthenticated: !!identity,
            tokenIdentifier: identity?.tokenIdentifier,
            email: identity?.email,
            issuer: identity?.issuer,
            subject: identity?.subject,
        };
    },
});

// Diagnostic: check what env vars Convex runtime actually sees
export const envCheck = query({
    args: {},
    handler: async () => {
        return {
            CLERK_JWT_ISSUER_DOMAIN: process.env.CLERK_JWT_ISSUER_DOMAIN ?? "NOT SET",
            CLERK_ISSUER_URL: process.env.CLERK_ISSUER_URL ?? "NOT SET",
        };
    },
});
