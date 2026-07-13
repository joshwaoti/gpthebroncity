import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { logAction, requirePermission } from "./lib";

const contactSubject = v.union(
  v.literal("general"),
  v.literal("prayer"),
  v.literal("testimony"),
  v.literal("membership"),
);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const submit = mutation({
  args: {
    name: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    subject: v.optional(contactSubject),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    const message = args.message.trim();
    if (!EMAIL_RE.test(email) || email.length > 320) throw new Error("A valid email address is required.");
    if (!message) throw new Error("A message is required.");
    if (message.length > 5000) throw new Error("Message is too long (max 5000 characters).");

    const hasStructuredName = !!args.firstName?.trim() || !!args.lastName?.trim();
    let firstName: string | undefined;
    let lastName: string | undefined;
    let name: string;

    if (hasStructuredName) {
      firstName = args.firstName?.trim() || undefined;
      lastName = args.lastName?.trim() || undefined;
      name = `${firstName ?? ""} ${lastName ?? ""}`.trim();
      if (!name) throw new Error("A valid name is required.");
    } else {
      const rawName = args.name?.trim();
      if (!rawName) throw new Error("A name is required. Provide either name or firstName/lastName.");
      name = rawName;
      const parts = rawName.split(/\s+/).filter(Boolean);
      firstName = parts[0] || undefined;
      lastName = parts.slice(1).join(" ") || undefined;
    }

    if (name.length > 200) throw new Error("Name is too long.");
    const phone = args.phone?.trim().slice(0, 32);
    return await ctx.db.insert("contacts", {
      firstName,
      lastName,
      name,
      email,
      phone: phone || undefined,
      subject: args.subject ?? "general",
      message,
      status: "new",
      timestamp: Date.now(),
    });
  },
});

export const getNewCount = query({
  args: {},
  handler: async (ctx) => {
    await requirePermission(ctx, "contacts:manage");
    const newItems = await ctx.db.query("contacts").withIndex("by_status", (q) => q.eq("status", "new")).collect();
    return newItems.length;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requirePermission(ctx, "contacts:manage");
    return await ctx.db.query("contacts").order("desc").collect();
  },
});

export const updateStatus = mutation({
  args: { id: v.id("contacts"), status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")) },
  handler: async (ctx, args) => {
    await requirePermission(ctx, "contacts:manage");
    const contact = await ctx.db.get(args.id);
    if (!contact) throw new Error("Contact submission not found.");
    if (contact.status === args.status) return;
    await ctx.db.patch(args.id, { status: args.status });
    await logAction(ctx, {
      action: "status_change",
      entityType: "Contact Submission",
      entityId: args.id,
      details: `${contact.name}: ${contact.status} -> ${args.status}`,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    await requirePermission(ctx, "contacts:manage");
    const contact = await ctx.db.get(args.id);
    if (!contact) return;
    await ctx.db.delete(args.id);
    await logAction(ctx, {
      action: "delete",
      entityType: "Contact Submission",
      entityId: args.id,
      details: `${contact.name} (${contact.email})`,
    });
  },
});
