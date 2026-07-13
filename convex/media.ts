import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { logAction, requirePermission } from "./lib";

/** Generate a short-lived URL the admin client can upload a file to. */
export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        await requirePermission(ctx, "media:manage");
        return await ctx.storage.generateUploadUrl();
    },
});

/** Record an uploaded file in the media library. */
export const saveAsset = mutation({
    args: {
        storageId: v.id("_storage"),
        name: v.string(),
        contentType: v.optional(v.string()),
        size: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { identity } = await requirePermission(ctx, "media:manage");
        const id = await ctx.db.insert("mediaAssets", {
            ...args,
            uploadedBy: identity.subject,
        });
        await logAction(ctx, { action: "create", entityType: "Media Asset", entityId: id, details: args.name });
        return id;
    },
});

/** List media assets with resolved public URLs (admin only). */
export const list = query({
    args: {},
    handler: async (ctx) => {
        await requirePermission(ctx, "media:manage");
        const assets = await ctx.db.query("mediaAssets").order("desc").collect();
        return await Promise.all(
            assets.map(async (asset) => ({
                ...asset,
                url: await ctx.storage.getUrl(asset.storageId),
            })),
        );
    },
});

/** Delete a media asset and its underlying file. */
export const remove = mutation({
    args: { id: v.id("mediaAssets") },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "media:manage");
        const asset = await ctx.db.get(args.id);
        if (!asset) return;
        await ctx.storage.delete(asset.storageId);
        await ctx.db.delete(args.id);
        await logAction(ctx, { action: "delete", entityType: "Media Asset", entityId: args.id, details: asset.name });
    },
});
