import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const contactSubject = v.union(
  v.literal("general"),
  v.literal("prayer"),
  v.literal("testimony"),
  v.literal("membership"),
);

/**
 * Convex requires args validators to be an object (or any),
 * so we use one object schema with optional fields to support:
 * 1) Legacy payload: { name, email, message }
 * 2) Structured payload: { firstName, lastName, email, phone?, subject, message }
 */
export const submit = mutation({
  args: {
    // Legacy
    name: v.optional(v.string()),
    // Structured
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    subject: v.optional(contactSubject),
    // Shared
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    const message = args.message.trim();

    const hasStructuredName =
      !!args.firstName?.trim() || !!args.lastName?.trim();

    let firstName: string | undefined;
    let lastName: string | undefined;
    let name: string;

    if (hasStructuredName) {
      firstName = args.firstName?.trim() || undefined;
      lastName = args.lastName?.trim() || undefined;
      name = `${firstName ?? ""} ${lastName ?? ""}`.trim();

      if (!name) {
        throw new Error("A valid name is required.");
      }
    } else {
      const rawName = args.name?.trim();

      if (!rawName) {
        throw new Error(
          "A name is required. Provide either `name` or `firstName`/`lastName`.",
        );
      }

      name = rawName;
      const parts = rawName.split(/\s+/).filter(Boolean);
      firstName = parts[0] || undefined;
      lastName = parts.slice(1).join(" ") || undefined;
    }

    const phone = args.phone?.trim();
    const subject = args.subject ?? "general";

    return await ctx.db.insert("contacts", {
      firstName,
      lastName,
      name,
      email,
      phone: phone && phone.length > 0 ? phone : undefined,
      subject,
      message,
      status: "new",
      timestamp: Date.now(),
    });
  },
});

export const getNewCount = query({
  args: {},
  handler: async (ctx) => {
    const newItems = await ctx.db
      .query("contacts")
      .withIndex("by_status", (q) => q.eq("status", "new"))
      .collect();

    return newItems.length;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contacts").order("desc").collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("contacts"),
    status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
