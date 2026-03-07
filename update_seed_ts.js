const fs = require('fs');
const enriched = JSON.parse(fs.readFileSync('blogs_enriched.json', 'utf8'));

const tsContent = `import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const run = mutation({
    args: {},
    handler: async (ctx) => {
        const blogs: any[] = ${JSON.stringify(enriched, null, 8)};

        for (const blog of blogs) {
            // Check if already exists
            const existing = await ctx.db
                .query("blogPosts")
                .withIndex("by_slug", (q) => q.eq("slug", blog.slug))
                .first();

            if (!existing) {
                await ctx.db.insert("blogPosts", {
                    ...blog,
                    status: "published",
                    createdBy: "system"
                });
            } else {
                await ctx.db.patch(existing._id, {
                    content: blog.content || existing.content,
                    excerpt: blog.excerpt || existing.excerpt,
                    author: blog.author || existing.author,
                    category: blog.category || existing.category,
                    imageUrl: blog.imageUrl || existing.imageUrl,
                    publishDate: blog.publishDate || existing.publishDate,
                });
            }
        }
        return { success: true, count: blogs.length };
    },
});
`;

fs.writeFileSync('convex/seed_blogs.ts', tsContent);
console.log('convex/seed_blogs.ts updated with actual content');
