import { mutation, query, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { logAction, requirePermission } from "./lib";

export const getSetting = query({
    args: { key: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("siteSettings")
            .withIndex("by_key", (q) => q.eq("key", args.key))
            .unique();
    },
});

export const updateSetting = mutation({
    args: { key: v.string(), value: v.any(), description: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const contentKeys = new Set(["homepageHero", "aboutContent"]);
        const permission = contentKeys.has(args.key) ? "content:manage" : "settings:manage";
        const { identity } = await requirePermission(ctx, permission);

        const existing = await ctx.db
            .query("siteSettings")
            .withIndex("by_key", (q) => q.eq("key", args.key))
            .unique();

        if (existing) {
            await ctx.db.patch(existing._id, {
                value: args.value,
                description: args.description,
                updatedBy: identity.subject,
            });
        } else {
            await ctx.db.insert("siteSettings", {
                key: args.key,
                value: args.value,
                description: args.description,
                updatedBy: identity.subject,
            });
        }
        await logAction(ctx, { action: "update", entityType: "Site Settings", entityId: args.key });
    },
});

// ─── List-valued settings (ministries, giving methods) ─────────────────────
//
// Both are stored as arrays inside siteSettings documents (keys: "ministries",
// "givingMethods"). Items carry a client-visible `_id` string so the admin UI
// can address them individually.

function generateItemId() {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

type ListItem = {
    id?: string;
    _id?: string;
    order?: number;
    [key: string]: unknown;
};

async function upsertListItem(
    ctx: MutationCtx,
    key: string,
    item: ListItem,
    updatedBy: string,
) {
    const doc = await ctx.db
        .query("siteSettings")
        .withIndex("by_key", (q) => q.eq("key", key))
        .unique();

    const items = (doc?.value as ListItem[] | undefined) ?? [];
    const id = item.id ?? item._id;
    let next: ListItem[];

    if (id) {
        const rest = { ...item };
        delete rest.id;
        next = items.map((m) => (m._id === id ? { ...m, ...rest, _id: id } : m));
        if (!items.some((m) => m._id === id)) {
            // Editing an item that vanished — append instead of silently dropping
            next = [...next, { ...rest, _id: id }];
        }
    } else {
        next = [...items, { ...item, _id: generateItemId() }];
    }

    // Keep display order stable
    next.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (doc) {
        await ctx.db.patch(doc._id, { value: next, updatedBy });
    } else {
        await ctx.db.insert("siteSettings", { key, value: next, updatedBy });
    }
    return next;
}

async function deleteListItem(
    ctx: MutationCtx,
    key: string,
    id: string,
    updatedBy: string,
) {
    const doc = await ctx.db
        .query("siteSettings")
        .withIndex("by_key", (q) => q.eq("key", key))
        .unique();
    if (!doc) return;

    const items = (doc.value as ListItem[] | undefined) ?? [];
    await ctx.db.patch(doc._id, {
        value: items.filter((m) => m._id !== id),
        updatedBy,
    });
}

// ─── Ministries ─────────────────────────────────────────────────────────────

export const getAllMinistries = query({
    args: {},
    handler: async (ctx) => {
        const doc = await ctx.db.query("siteSettings").withIndex("by_key", (q) => q.eq("key", "ministries")).unique();
        return (doc?.value as ListItem[] | undefined) ?? [];
    },
});

export const upsertMinistry = mutation({
    args: {
        id: v.optional(v.string()),
        title: v.string(),
        description: v.optional(v.string()),
        leader: v.optional(v.string()),
        schedule: v.optional(v.string()),
        image: v.optional(v.string()),
        isActive: v.optional(v.boolean()),
        order: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { identity } = await requirePermission(ctx, "ministries:manage");
        if (!args.title.trim()) throw new Error("Ministry name is required.");

        await upsertListItem(ctx, "ministries", args, identity.subject);
        await logAction(ctx, {
            action: args.id ? "update" : "create",
            entityType: "Ministry",
            entityId: args.id,
            details: args.title,
        });
    },
});

export const deleteMinistry = mutation({
    args: { id: v.string() },
    handler: async (ctx, args) => {
        const { identity } = await requirePermission(ctx, "ministries:manage");
        await deleteListItem(ctx, "ministries", args.id, identity.subject);
        await logAction(ctx, { action: "delete", entityType: "Ministry", entityId: args.id });
    },
});

// ─── Giving methods ─────────────────────────────────────────────────────────

export const getAllGivingMethods = query({
    args: {},
    handler: async (ctx) => {
        const doc = await ctx.db.query("siteSettings").withIndex("by_key", (q) => q.eq("key", "givingMethods")).unique();
        return (doc?.value as ListItem[] | undefined) ?? [];
    },
});

export const upsertGivingMethod = mutation({
    args: {
        id: v.optional(v.string()),
        title: v.string(),
        type: v.optional(v.string()),
        description: v.optional(v.string()),
        details: v.optional(v.array(v.object({ label: v.string(), value: v.string() }))),
        isActive: v.optional(v.boolean()),
        order: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { identity } = await requirePermission(ctx, "giving:manage");
        if (!args.title.trim()) throw new Error("Title is required.");

        await upsertListItem(ctx, "givingMethods", args, identity.subject);
        await logAction(ctx, {
            action: args.id ? "update" : "create",
            entityType: "Giving Method",
            entityId: args.id,
            details: args.title,
        });
    },
});

export const deleteGivingMethod = mutation({
    args: { id: v.string() },
    handler: async (ctx, args) => {
        const { identity } = await requirePermission(ctx, "giving:manage");
        await deleteListItem(ctx, "givingMethods", args.id, identity.subject);
        await logAction(ctx, { action: "delete", entityType: "Giving Method", entityId: args.id });
    },
});
