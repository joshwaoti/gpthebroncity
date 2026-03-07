import { query } from "./_generated/server";
import { api } from "./_generated/api";

export const test = query({
    args: {},
    handler: async (ctx) => {
        const results = await ctx.db
            .query("blogPosts")
            .withIndex("by_status", (q) => q.eq("status", "published"))
            .order("desc")
            .paginate({ numItems: 6, cursor: null });
        return results;
    },
});
