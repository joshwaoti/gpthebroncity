import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        role: v.optional(v.string()),
        lastLogin: v.optional(v.number()),
    })
        .index("by_clerkId", ["clerkId"]),

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
        status: v.union(v.literal("active"), v.literal("draft"), v.literal("archived")),
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
        status: v.union(v.literal("upcoming"), v.literal("completed"), v.literal("cancelled")),
        createdBy: v.string(),
    })
        .index("by_status", ["status"])
        .index("by_status_date", ["status", "date"]),

    blogPosts: defineTable({
        title: v.string(),
        content: v.string(),
        author: v.optional(v.string()),
        publishDate: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        excerpt: v.optional(v.string()),
        slug: v.string(),
        status: v.union(v.literal("published"), v.literal("draft")),
        createdBy: v.string(),
    })
        .index("by_slug", ["slug"])
        .index("by_status", ["status"]),

    projects: defineTable({
        name: v.string(),
        description: v.optional(v.string()),
        status: v.union(v.literal("active"), v.literal("completed"), v.literal("on_hold")),
        value: v.optional(v.number()),
        date: v.optional(v.string()),
        createdBy: v.string(),
    }).index("by_status", ["status"]),

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
        details: v.optional(v.string()),
        timestamp: v.number(),
    }).index("by_timestamp", ["timestamp"]),

    contacts: defineTable({
        name: v.string(),
        email: v.string(),
        message: v.string(),
        status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")),
        timestamp: v.number(),
    }).index("by_status", ["status"]),
});
