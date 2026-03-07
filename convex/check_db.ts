import { query } from "./_generated/server";

export const checkStatus = query({
    args: {},
    handler: async (ctx) => {
        const all = await ctx.db.query("blogPosts").collect();
        return {
            total: all.length,
            statuses: all.map(p => p.status),
            categories: all.map(p => p.category)
        };
    },
});
