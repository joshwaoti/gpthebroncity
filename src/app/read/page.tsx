"use client"

import { useState } from "react"
import { usePaginatedQuery, useQuery } from "convex/react"
import { api } from "@/../convex/_generated/api"
import { FeaturedArticle } from "@/components/blog/featured-article"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogFilters } from "@/components/blog/blog-filters"
import { BlogSkeleton, FeaturedBlogSkeleton } from "@/components/blog/blog-skeleton"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

const CATEGORIES = ["Theology", "Leadership", "Vision", "Doctrine", "Family", "Community", "Growth", "Worship"]

export default function ReadPage() {
    const [activeCategory, setActiveCategory] = useState('All')

    // Fetch featured post (latest published)
    const featuredPosts = useQuery(api.blog.getLatest, { limit: 1 })
    const featuredPost: any = featuredPosts?.[0]

    // Fetch paginated posts
    const { results, status, loadMore } = usePaginatedQuery(
        api.blog.listPaginated,
        {
            status: "published",
            category: activeCategory === 'All' ? undefined : activeCategory
        },
        { initialNumItems: 6 }
    )

    const isLoadingFeatured = featuredPosts === undefined
    const isLoadingResults = status === "LoadingFirstPage"
    const isLoadingMore = status === "LoadingMore"
    const isDone = status === "Exhausted"

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 pb-20">
                <section className="container mx-auto px-4 mb-16">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="w-8 h-[2px] bg-gold" />
                            <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">
                                Our Blog
                            </span>
                            <div className="w-8 h-[2px] bg-gold" />
                        </div>
                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Theological <span className="text-[#257300] dark:text-[#B2CB20]">Insights</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Resources to help you grow in faith, leadership, and life.
                        </p>
                    </div>

                    {isLoadingFeatured ? (
                        <FeaturedBlogSkeleton />
                    ) : featuredPost && (
                        <FeaturedArticle
                            title={featuredPost.title}
                            excerpt={featuredPost.excerpt}
                            date={featuredPost.publishDate || new Date(featuredPost._creationTime).toLocaleDateString()}
                            author={featuredPost.author}
                            category={featuredPost.category || "General"}
                            image={featuredPost.imageUrl || "/assets/img/pasi.jpg"}
                            slug={featuredPost.slug}
                            readTime="5 min"
                        />
                    )}
                </section>

                <section className="container mx-auto px-4">
                    <BlogFilters
                        categories={CATEGORIES}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />

                    {isLoadingResults ? (
                        <BlogSkeleton />
                    ) : results.length === 0 ? (
                        <div className="text-center py-20 bg-accent/20 rounded-2xl border border-dashed border-border">
                            <h3 className="text-xl font-medium text-muted-foreground">No articles found in this category</h3>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {results.map((post) => (
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
                                ))}
                            </div>

                            {!isDone && (
                                <div className="mt-16 flex justify-center">
                                    <Button
                                        onClick={() => loadMore(6)}
                                        disabled={isLoadingMore}
                                        variant="outline"
                                        className="rounded-full px-8 py-6 border-[#257300] text-[#257300] hover:bg-[#257300] hover:text-white transition-all duration-300"
                                    >
                                        {isLoadingMore ? "Loading more..." : "Load More Articles"}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
            <Footer />
        </main>
    )
}
