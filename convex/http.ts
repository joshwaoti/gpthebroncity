import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";

const http = httpRouter();

http.route({
    path: "/clerk",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const payloadString = await request.text();
        const headerPayload = request.headers;

        try {
            const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";
            const wh = new Webhook(webhookSecret);
            const payload = wh.verify(payloadString, {
                "svix-id": headerPayload.get("svix-id")!,
                "svix-timestamp": headerPayload.get("svix-timestamp")!,
                "svix-signature": headerPayload.get("svix-signature")!,
            }) as any;

            switch (payload.type) {
                case "user.created":
                case "user.updated":
                    await ctx.runMutation(internal.users.upsertFromClerk, {
                        clerkId: payload.data.id,
                        name: `${payload.data.first_name || ""} ${payload.data.last_name || ""}`.trim() || undefined,
                        email: payload.data.email_addresses?.[0]?.email_address,
                        imageUrl: payload.data.image_url,
                    });
                    break;
                case "user.deleted":
                    await ctx.runMutation(internal.users.deleteFromClerk, {
                        clerkId: payload.data.id,
                    });
                    break;
            }

            return new Response(null, { status: 200 });
        } catch (err) {
            console.error("Webhook signature verification failed.", err);
            return new Response("Webhook Error", { status: 400 });
        }
    }),
});

export default http;
