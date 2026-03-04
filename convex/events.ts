import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

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
        let q = ctx.db
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
    args: { status: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (args.status && args.status !== "all") {
            return await ctx.db.query("events")
                .withIndex("by_status", (sq) => sq.eq("status", args.status as any))
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
        let q = ctx.db.query("events")
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
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated call to create event");

        return await ctx.db.insert("events", {
            ...args,
            createdBy: identity.subject,
            status: "upcoming",
        });
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
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");
        const { id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});

export const remove = mutation({
    args: { id: v.id("events") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated call to remove event");
        await ctx.db.delete(args.id);
    },
});

// Migration: auto-update status of past events to "completed"
export const markPastEventsCompleted = mutation({
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
        return `Marked ${updated} past events as completed.`;
    },
});
