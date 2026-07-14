import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { logAction, requirePermission } from "./lib";

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
        await requirePermission(ctx, "events:manage");

        const existing = await ctx.db
            .query("eventRegistrationForms")
            .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
            .unique();

        const { eventId, ...data } = args;

        // Also update the parent event's requiresRegistration flag
        await ctx.db.patch(eventId, { requiresRegistration: args.enabled });

        if (existing) {
            await ctx.db.patch(existing._id, data);
            await logAction(ctx, {
                action: "update",
                entityType: "Event Registration Form",
                entityId: existing._id,
                details: `Registration ${args.enabled ? "enabled" : "disabled"}; ${args.fields.length} fields`,
            });
            return existing._id;
        }
        const id = await ctx.db.insert("eventRegistrationForms", { eventId, ...data });
        await logAction(ctx, {
            action: "create",
            entityType: "Event Registration Form",
            entityId: id,
            details: `Registration ${args.enabled ? "enabled" : "disabled"}; ${args.fields.length} fields`,
        });
        return id;
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

        // Validate submitted data against the form definition (public endpoint)
        const data = args.data as Record<string, unknown>;
        if (typeof data !== "object" || data === null || Array.isArray(data)) {
            throw new Error("Invalid registration data.");
        }
        const allowedIds = new Set(form.fields.map((f) => f.id));
        for (const key of Object.keys(data)) {
            if (!allowedIds.has(key)) delete data[key];
        }
        for (const field of form.fields) {
            const value = data[field.id];
            if (field.required && (value === undefined || value === null || String(value).trim() === "")) {
                return { status: "invalid" as const, field: field.label };
            }
            if (value !== undefined && String(value).length > 2000) {
                throw new Error(`Value for "${field.label}" is too long.`);
            }
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
        await requirePermission(ctx, "events:manage");

        return await ctx.db
            .query("eventRegistrations")
            .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
            .order("desc")
            .collect();
    },
});

/**
 * Public aggregate used to show capacity on the registration form.
 * Individual registrations and internal status totals remain admin-only.
 */
export const getRegistrationCount = query({
    args: { eventId: v.id("events") },
    handler: async (ctx, args) => {
        const all = await ctx.db
            .query("eventRegistrations")
            .withIndex("by_eventId", (q) => q.eq("eventId", args.eventId))
            .collect();
        return {
            confirmed: all.filter((r) => r.status === "confirmed").length,
        };
    },
});

/** Cancel a single registration (admin only). */
export const cancelRegistration = mutation({
    args: { registrationId: v.id("eventRegistrations") },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "events:manage");
        await ctx.db.patch(args.registrationId, { status: "cancelled" });
        await logAction(ctx, { action: "update", entityType: "Event Registration", entityId: args.registrationId, details: "Cancelled registration" });
    },
});

/** Permanently delete a registration (admin only). */
export const deleteRegistration = mutation({
    args: { registrationId: v.id("eventRegistrations") },
    handler: async (ctx, args) => {
        await requirePermission(ctx, "events:manage");
        await ctx.db.delete(args.registrationId);
        await logAction(ctx, { action: "delete", entityType: "Event Registration", entityId: args.registrationId });
    },
});
