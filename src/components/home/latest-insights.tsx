
"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog/blog-card"
import { useQuery } from "convex/react"
import { api } from "@/../convex/_generated/api"

export function LatestInsights() {
    const latestPosts = useQuery(api.blog.getLatest, { limit: 3 });

    return (
        <section className="py-24 bg-accent dark:bg-black relative">
            {/* Subtle pattern */}
            <div className="absolute inset-0 section-pattern dark:opacity-0 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-[2px] bg-gold" />
                            <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">
                                Read
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            Latest Insights
                        </h2>
                    </div>
                    <Link href="/read">
                        <Button variant="link" className="text-[#257300] dark:text-[#B2CB20] gap-2">
                            View All Articles <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestPosts === undefined ? (
                        <div className="col-span-full text-center text-muted-foreground py-8">Loading insights...</div>
                    ) : latestPosts.length === 0 ? (
                        <div className="col-span-full text-center text-muted-foreground py-8">No insights available right now.</div>
                    ) : (
                        latestPosts.map((post: any) => (
                            <BlogCard
                                key={post._id}
                                title={post.title}
                                excerpt={post.excerpt || ""}
                                date={post.publishDate || new Date(post._creationTime).toLocaleDateString()}
                                author={post.author || "Unknown"}
                                category={post.category || "General"}
                                image={post.imageUrl || "/assets/img/pasi.jpg"}
                                slug={post.slug}
                                readTime="4 min"
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}

