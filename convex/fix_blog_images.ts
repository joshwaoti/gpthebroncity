import { mutation } from "./_generated/server";

/**
 * Fixes blog post image URLs to use ONLY existing images from the /blogs/ folder
 */
export const run = mutation({
    args: {},
    handler: async (ctx) => {
        // ONLY use images that actually exist in /public/assets/img/blogs/
        const imageMap: Record<string, string> = {
            "kingdom-mindset": "/assets/img/blogs/kingdom_mindset.png",
            "raising-christlike-children": "/assets/img/blogs/raising_children.png",
            "power-of-prayer": "/assets/img/blogs/becoming_restless.png",
            "stewardship-managing-gods-resources": "/assets/img/blogs/transformed_community.png",
            "identity-in-christ": "/assets/img/blogs/growing_holistically.png",
            "holy-spirit-power": "/assets/img/blogs/intentional_growth.png",
            "spiritual-warfare": "/assets/img/blogs/doctrine_life.png",
            "forgiveness-reconciliation": "/assets/img/blogs/change_critical.png",
            "faith-trusting-god": "/assets/img/blogs/early_church_worship.png",
        };

        let updated = 0;
        
        for (const [slug, imageUrl] of Object.entries(imageMap)) {
            const post = await ctx.db
                .query("blogPosts")
                .withIndex("by_slug", (q) => q.eq("slug", slug))
                .unique();
            
            if (post) {
                await ctx.db.patch(post._id, { imageUrl });
                updated++;
            }
        }

        return {
            success: true,
            message: `Updated ${updated} blog post images with existing files`,
            updated,
        };
    },
});
