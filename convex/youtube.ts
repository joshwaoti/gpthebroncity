import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const syncSermons = action({
    args: {},
    handler: async (ctx) => {
        const apiKey = process.env.YOUTUBE_API_KEY;
        const playlistId = process.env.YOUTUBE_PLAYLIST_ID;

        if (!apiKey || !playlistId) {
            console.warn("Missing YOUTUBE_API_KEY or YOUTUBE_PLAYLIST_ID environment variables");
            return { success: false, error: "Missing environment variables" };
        }

        let nextPageToken = "";
        let fetchedCount = 0;

        do {
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=50&playlistId=${playlistId}&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`;

            const response = await fetch(url);
            if (!response.ok) {
                console.error("YouTube API failed:", await response.text());
                return { success: false, error: "YouTube API request failed" };
            }

            const data = await response.json() as any;
            const items = data.items || [];
            nextPageToken = data.nextPageToken || "";

            for (const item of items) {
                const videoId = item.contentDetails?.videoId;
                if (!videoId) continue;

                const privacyStatus = item.status?.privacyStatus;
                if (privacyStatus === "private") continue;

                const title = item.snippet?.title;
                if (!title || title === "Private video" || title === "Deleted video") continue;

                const description = item.snippet?.description || "";
                const publishedAt = item.snippet?.publishedAt;
                const thumbnails = item.snippet?.thumbnails;
                const thumbnailUrl = thumbnails?.maxres?.url || thumbnails?.high?.url || thumbnails?.medium?.url || thumbnails?.default?.url;

                await ctx.runMutation(internal.youtube.upsertSermon, {
                    youtubeVideoId: videoId,
                    title,
                    description,
                    thumbnailUrl,
                    date: publishedAt,
                    videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
                });
                fetchedCount++;
            }
        } while (nextPageToken);

        return { success: true, count: fetchedCount };
    },
});

export const upsertSermon = internalMutation({
    args: {
        youtubeVideoId: v.string(),
        title: v.string(),
        description: v.string(),
        thumbnailUrl: v.optional(v.string()),
        date: v.optional(v.string()),
        videoUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("sermons")
            .withIndex("by_youtubeVideoId", (q) => q.eq("youtubeVideoId", args.youtubeVideoId))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                title: args.title,
                description: args.description,
                thumbnailUrl: args.thumbnailUrl,
                date: args.date,
                videoUrl: args.videoUrl,
            });
            return existing._id;
        } else {
            return await ctx.db.insert("sermons", {
                youtubeVideoId: args.youtubeVideoId,
                title: args.title,
                description: args.description,
                thumbnailUrl: args.thumbnailUrl,
                date: args.date,
                videoUrl: args.videoUrl,
                status: "active", // Automatically activate synced sermons
                createdBy: "system",
                speaker: "Pst Albert Shitakwa", // Default pastor
            });
        }
    },
});
