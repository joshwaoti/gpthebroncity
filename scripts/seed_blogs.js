import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const blogData = JSON.parse(fs.readFileSync("blogs_extracted.json", "utf-8"));

const imageMap = {
    "Sermon_GPT Church - Hebron City_June 18, 2023.pdf": {
        image: "/assets/img/blogs/kingdom_mindset.png",
        category: "Theology",
        excerpt: "Are you governed by a Kingdom or Worldly mindset? Explore how our perspective shapes our decisions and fruitfulness."
    },
    "Teaching_GPT Church - Hebron City_August 16, 2023.pdf": {
        image: "/assets/img/blogs/raising_children.png",
        category: "Family",
        excerpt: "Practical wisdom on raising Christlike children who bring joy and glory to God and their parents."
    },
    "Teaching_GPT Church - Hebron City_August 27, 2023.pdf": {
        image: "/assets/img/blogs/transformed_community.png",
        category: "Community",
        excerpt: "Insights into the culture of the early church and how consistency in fellowship transforms a community."
    },
    "Teaching_GPT Church - Hebron City_July 26, 2023.pdf": {
        image: "/assets/img/blogs/becoming_restless.png",
        category: "Growth",
        excerpt: "What must we do to grow? Learn why becoming restless with the status quo is the first step to spiritual progress."
    },
    "Teaching_GPT Church - Hebron City_July 5, 2023.pdf": {
        image: "/assets/img/blogs/change_critical.png",
        category: "Growth",
        excerpt: "Change is critical for growth. Discover why spiritual maturity requires activation and a willingness to leave the familiar."
    },
    "Teaching_GPT Church - Hebron City_May 31, 2023.pdf": {
        image: "/assets/img/blogs/growing_holistically.png",
        category: "Growth",
        excerpt: "God is interested in your growth in all dimensions: spiritually, physically, intellectually, and socially."
    },
    "Teaching_GPT Church - Hebron City_October 11, 2023.pdf": {
        image: "/assets/img/blogs/intentional_growth.png",
        category: "Growth",
        excerpt: "Intentional spiritual growth through perseverance. Learn how to build the muscle of endurance in your walk with Christ."
    },
    "Teaching_GPT Church - Hebron City_October 22, 2023.pdf": {
        image: "/assets/img/blogs/doctrine_life.png",
        category: "Doctrine",
        excerpt: "Your doctrine and manner of life should be one. Explore why true Christlikeness is found in the fruit we produce."
    },
    "Teaching_GPT Church - Hebron City_September 17, 2023.pdf": {
        image: "/assets/img/blogs/early_church_worship.png",
        category: "Worship",
        excerpt: "Lessons from the early church on consistent congregational worship and its impact on the community."
    }
};

async function seed() {
    console.log("Seeding blogs...");
    for (const post of blogData) {
        const meta = imageMap[post.filename];
        if (!meta) continue;

        const title = post.content.split('\n').find(l => l.includes('TITLE:') || l.includes('Title:'))?.split(':')[1]?.trim() || post.filename;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const authorMatch = post.content.match(/(Sermon by|Teaching by)\s+(.+)/);
        const author = authorMatch ? authorMatch[2].trim() : "Admin";
        const dateMatch = post.content.match(/(Sunday|Wednesday),\s*([A-Za-z]+\s+\d+,\s+\d{4})/);
        const publishDate = dateMatch ? dateMatch[2] : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        try {
            // Using internal mutation or a bypass for createdBy if system auth isn't configured for scripts
            // For this task, I'll assume the 'create' mutation works if I can mock user identity or if I use an admin-only mutation
            // Since 'create' requires identity, I'll update it in blog.ts to allow a 'system' override if being run from script
            // OR I will create a seed mutation in Convex. Let's create a seed mutation for safety.

            await client.mutation(api.blog.seedBlogPost, {
                title,
                content: post.content,
                author,
                publishDate,
                imageUrl: meta.image,
                excerpt: meta.excerpt,
                slug,
                status: "published",
                category: meta.category,
            });
            console.log(`- Seeded: ${title}`);
        } catch (e) {
            console.error(`- Failed to seed ${title}:`, e);
        }
    }
    console.log("Seeding complete!");
}

seed();
