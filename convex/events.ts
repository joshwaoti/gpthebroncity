import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { logAction, requirePermission } from "./lib";

const TODAY = () => new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

// Query upcoming events (date >= today) for frontend
export const getUpcoming = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        const today = TODAY();
        const results = await ctx.db
            .query("events")
            .withIndex("by_status_date", (q) =>
                q.eq("status", "upcoming").gte("date", today)
            )
            .order("asc")
            .take(args.limit ?? 100);
        return results;
    },
});

// Query ALL upcoming events (no pagination) for the calendar view — covers all months
export const getForCalendar = query({
    args: { category: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const today = TODAY();
        const currentMonthStart = today.slice(0, 7) + "-01";
        const q = ctx.db
            .query("events")
            .withIndex("by_status_date", (q) =>
                q.eq("status", "upcoming").gte("date", currentMonthStart)
            );

        const results = await q.order("asc").collect();

        if (args.category && args.category !== "All") {
            return results.filter(e => e.category === args.category);
        }
        return results;
    },
});

// Get a single event by ID
export const getById = query({
    args: { id: v.id("events") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// List all events for admin (no date filter)
export const list = query({
    args: {
        status: v.optional(
            v.union(v.literal("upcoming"), v.literal("completed"), v.literal("cancelled"), v.literal("all")),
        ),
    },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "events:manage");
        const status = args.status;
        if (status && status !== "all") {
            return await ctx.db.query("events")
                .withIndex("by_status", (sq) => sq.eq("status", status))
                .order("desc")
                .collect();
        }
        return await ctx.db.query("events").order("asc").collect();
    },
});

// Paginated query for public events page (upcoming only, date-filtered)
export const getPaginated = query({
    args: { paginationOpts: paginationOptsValidator, category: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const today = TODAY();
        const q = ctx.db.query("events")
            .withIndex("by_status_date", (q) =>
                q.eq("status", "upcoming").gte("date", today)
            )
            .order("asc");

        const results = await q.paginate(args.paginationOpts);

        // Optional category post-filter (rarely used given the small # of categories)
        if (args.category && args.category !== "All") {
            results.page = results.page.filter(e => e.category === args.category);
        }

        return results;
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        description: v.optional(v.string()),
        date: v.string(),
        endDate: v.optional(v.string()),
        startTime: v.optional(v.string()),
        endTime: v.optional(v.string()),
        location: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        category: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { identity } = await requirePermission(ctx, "events:manage");

        if (!args.title.trim()) throw new Error("Title is required.");
        if (!args.date) throw new Error("Date is required.");

        const id = await ctx.db.insert("events", {
            ...args,
            createdBy: identity.subject,
            status: "upcoming",
        });
        await logAction(ctx, { action: "create", entityType: "Event", entityId: id, details: args.title });
        return id;
    },
});

export const update = mutation({
    args: {
        id: v.id("events"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        date: v.optional(v.string()),
        endDate: v.optional(v.string()),
        startTime: v.optional(v.string()),
        endTime: v.optional(v.string()),
        location: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        category: v.optional(v.string()),
        status: v.optional(v.union(v.literal("upcoming"), v.literal("completed"), v.literal("cancelled"))),
    },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "events:manage");
        const { id, ...fields } = args;
        const existing = await ctx.db.get(id);
        if (!existing) throw new Error("Event not found.");
        await ctx.db.patch(id, fields);
        await logAction(ctx, { action: "update", entityType: "Event", entityId: id, details: fields.title ?? existing.title });
    },
});

export const remove = mutation({
    args: { id: v.id("events") },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "events:manage");
        const existing = await ctx.db.get(args.id);
        if (!existing) return;

        // Clean up registration forms + registrations tied to this event
        const form = await ctx.db
            .query("eventRegistrationForms")
            .withIndex("by_eventId", (q) => q.eq("eventId", args.id))
            .unique();
        if (form) {
            const regs = await ctx.db
                .query("eventRegistrations")
                .withIndex("by_eventId", (q) => q.eq("eventId", args.id))
                .collect();
            for (const reg of regs) {
                await ctx.db.delete(reg._id);
            }
            await ctx.db.delete(form._id);
        }

        await ctx.db.delete(args.id);
        await logAction(ctx, { action: "delete", entityType: "Event", entityId: args.id, details: existing.title });
    },
});

// Cron job: auto-update status of past events to "completed".
// Internal so it cannot be triggered from outside.
export const markPastEventsCompleted = internalMutation({
    args: {},
    handler: async (ctx) => {
        const today = TODAY();
        const all = await ctx.db.query("events")
            .withIndex("by_status", q => q.eq("status", "upcoming"))
            .collect();
        let updated = 0;
        for (const event of all) {
            if (event.date < today) {
                await ctx.db.patch(event._id, { status: "completed" });
                updated++;
            }
        }
        if (updated > 0) {
            await ctx.db.insert("auditLog", {
                action: "status_change",
                entityType: "Event",
                userId: "system",
                userName: "System",
                actorRole: "system",
                details: `Automatically marked ${updated} past event${updated === 1 ? "" : "s"} completed`,
                timestamp: Date.now(),
            });
        }
        return `Marked ${updated} past events as completed.`;
    },
});
