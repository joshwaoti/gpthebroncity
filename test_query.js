const { ConvexHttpClient } = require("convex/browser");
const { api } = require("./convex/_generated/api");
require("dotenv").config({ path: ".env.local" });

async function main() {
    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    try {
        const results = await client.query(api.blog.listPaginated, {
            paginationOpts: { numItems: 6, cursor: null },
            status: "published"
        });
        console.log("Results count:", results.page.length);
        console.log("Is done:", results.isDone);
        if (results.page.length > 0) {
            console.log("First item title:", results.page[0].title);
        }
    } catch (e) {
        console.error("Query failed:", e.message);
    }
}

main();
