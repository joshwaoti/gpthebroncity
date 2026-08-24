import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    role: v.optional(
      v.union(
        v.literal("super_admin"),
        v.literal("editor"),
        v.literal("ministry_leader"),
        v.literal("finance_admin"),
        v.literal("user"),
      ),
    ),
    lastLogin: v.optional(v.number()),
  }).index("by_clerkId", ["clerkId"]),

  sermons: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    speaker: v.optional(v.string()),
    date: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isFeatured: v.optional(v.boolean()),
    status: v.union(
      v.literal("active"),
      v.literal("draft"),
      v.literal("archived"),
    ),
    createdBy: v.string(),
    youtubeVideoId: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_youtubeVideoId", ["youtubeVideoId"]),

  events: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    date: v.string(),
    endDate: v.optional(v.string()),
    startTime: v.optional(v.string()),
    endTime: v.optional(v.string()),
    location: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    category: v.optional(v.string()),
    requiresRegistration: v.optional(v.boolean()),
    status: v.union(
      v.literal("upcoming"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
    createdBy: v.string(),
  })
    .index("by_status", ["status"])
    .index("by_status_date", ["status", "date"]),

  eventRegistrationForms: defineTable({
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
          v.literal("checkbox"),
        ),
        required: v.boolean(),
        options: v.optional(v.array(v.string())),
        placeholder: v.optional(v.string()),
      }),
    ),
    maxCapacity: v.optional(v.number()),
  }).index("by_eventId", ["eventId"]),

  eventRegistrations: defineTable({
    eventId: v.id("events"),
    formId: v.id("eventRegistrationForms"),
    data: v.any(),
    submittedAt: v.number(),
    email: v.optional(v.string()),
    status: v.union(v.literal("confirmed"), v.literal("cancelled")),
  })
    .index("by_eventId", ["eventId"])
    .index("by_eventId_email", ["eventId", "email"]),

  blogPosts: defineTable({
    title: v.string(),
    content: v.string(),
    author: v.optional(v.string()),
    publishDate: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    slug: v.string(),
    status: v.union(v.literal("published"), v.literal("draft")),
    category: v.optional(v.string()),
    createdBy: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_category", ["category"]),

  projects: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("on_hold"),
    ),
    value: v.optional(v.number()),
    goalAmount: v.optional(v.number()),
    date: v.optional(v.string()),
    createdBy: v.string(),
  }).index("by_status", ["status"]),

  mediaAssets: defineTable({
    storageId: v.id("_storage"),
    name: v.string(),
    contentType: v.optional(v.string()),
    size: v.optional(v.number()),
    uploadedBy: v.string(),
  }).index("by_storageId", ["storageId"]),

  siteSettings: defineTable({
    key: v.string(),
    value: v.any(),
    description: v.optional(v.string()),
    updatedBy: v.string(),
  }).index("by_key", ["key"]),

  auditLog: defineTable({
    action: v.string(),
    entityType: v.string(),
    entityId: v.optional(v.string()),
    userId: v.string(),
    userName: v.optional(v.string()),
    userEmail: v.optional(v.string()),
    actorRole: v.optional(v.string()),
    details: v.optional(v.string()),
    timestamp: v.number(),
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_user_timestamp", ["userId", "timestamp"])
    .index("by_entity", ["entityType", "entityId"]),

  contacts: defineTable({
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.optional(
      v.union(
        v.literal("general"),
        v.literal("prayer"),
        v.literal("testimony"),
        v.literal("membership"),
      ),
    ),
    message: v.string(),
    status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")),
    timestamp: v.number(),
  }).index("by_status", ["status"]),
});
