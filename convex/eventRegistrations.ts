import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ─── Form management (admin) ────────────────────────────────────────────────

/** Get the registration form definition for an event. Public – used by frontend to render the form. */
export const getForm = query({
    args: { eventId: v.id("events") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("eventRegistrationForms")
            .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
            .unique();
    },
});

/** Create or update the registration form for an event (admin only). */
export const upsertForm = mutation({
    args: {
        eventId: v.id("events"),
        enabled: v.boolean(),
        fields: v.array(
            v.object({
                id: v.string(),
                label: v.string(),
                type: v.union(
                    v.literal("text"),
                    v.literal("email"),
                    v.literal("phone"),
                    v.literal("number"),
                    v.literal("textarea"),
                    v.literal("select"),
                ),
                required: v.boolean(),
                options: v.optional(v.array(v.string())),
                placeholder: v.optional(v.string()),
            }),
        ),
        maxCapacity: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const existing = await ctx.db
            .query("eventRegistrationForms")
            .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
            .unique();

        const { eventId, ...data } = args;

        // Also update the parent event's requiresRegistration flag
        await ctx.db.patch(eventId, { requiresRegistration: args.enabled });

        if (existing) {
            await ctx.db.patch(existing._id, data);
            return existing._id;
        }
        return await ctx.db.insert("eventRegistrationForms", { eventId, ...data });
    },
});

// ─── Registration submission (public) ───────────────────────────────────────

/** Submit a registration.
 *  Returns { status: "ok", id } on success, or { status: "full" | "disabled" | "duplicate" } for soft errors.
 *  Throws only for unexpected hard errors. */
export const submit = mutation({
    args: {
        eventId: v.id("events"),
        data: v.any(), // { [fieldId]: value }
    },
    handler: async (ctx, args) => {
        // Load the form definition
        const form = await ctx.db
            .query("eventRegistrationForms")
            .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
            .unique();

        if (!form || !form.enabled) {
            return { status: "disabled" as const };
        }

        // Capacity check
        if (form.maxCapacity) {
            const allRegs = await ctx.db
                .query("eventRegistrations")
                .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
                .collect();
            const confirmed = allRegs.filter((r) => r.status === "confirmed").length;
            if (confirmed >= form.maxCapacity) {
                return { status: "full" as const };
            }
        }

        // Extract email from data for the duplicate guard
        const emailField = form.fields.find((f) => f.type === "email");
        const email: string | undefined = emailField
            ? (args.data as Record<string, string>)[emailField.id]?.toLowerCase().trim()
            : undefined;

        // Duplicate check
        if (email) {
            const duplicate = await ctx.db
                .query("eventRegistrations")
                .withIndex("by_eventId_email", (q) =>
                    q.eq("eventId", args.eventId).eq("email", email)
                )
                .first();
            if (duplicate && duplicate.status === "confirmed") {
                return { status: "duplicate" as const };
            }
        }

        const id = await ctx.db.insert("eventRegistrations", {
            eventId: args.eventId,
            formId: form._id,
            data: args.data,
            submittedAt: Date.now(),
            email,
            status: "confirmed",
        });
        return { status: "ok" as const, id };
    },
});

// ─── Registrations management (admin) ───────────────────────────────────────

/** List all registrations for an event (admin only). */
export const getRegistrations = query({
    args: { eventId: v.id("events") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        return await ctx.db
            .query("eventRegistrations")
            .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
            .order("desc")
            .collect();
    },
});

/** Lightweight count of confirmed registrations (used in the admin events list). */
export const getRegistrationCount = query({
    args: { eventId: v.id("events") },
    handler: async (ctx, args) => {
        const all = await ctx.db
            .query("eventRegistrations")
            .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
            .collect();
        return {
            total: all.length,
            confirmed: all.filter((r) => r.status === "confirmed").length,
            cancelled: all.filter((r) => r.status === "cancelled").length,
        };
    },
});

/** Cancel a single registration (admin only). */
export const cancelRegistration = mutation({
    args: { registrationId: v.id("eventRegistrations") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");
        await ctx.db.patch(args.registrationId, { status: "cancelled" });
    },
});

/** Permanently delete a registration (admin only). */
export const deleteRegistration = mutation({
    args: { registrationId: v.id("eventRegistrations") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");
        await ctx.db.delete(args.registrationId);
    },
});
