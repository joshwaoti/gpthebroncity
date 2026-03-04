"use client"

import { useState } from "react"
import { MediaCard } from "./media-card"
import { MediaFilter } from "./media-filter"
import { MediaCardSkeleton } from "./media-card-skeleton"
import { motion, AnimatePresence } from "framer-motion"
import { usePaginatedQuery } from "convex/react"
import { api } from "@/../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function MediaGrid() {
    const [activeCategory, setActiveCategory] = useState("All")

    const { results, status, loadMore } = usePaginatedQuery(
        api.sermons.listPaginated,
        {},
        { initialNumItems: 9 }
    );

    // Map Convex data to expected frontend format, filter by category locally
    const mappedItems = results.map(sermon => ({
        id: sermon._id,
        title: sermon.title,
        preacher: sermon.speaker || "Pastor",
        series: sermon.category || "Sunday Service",
        date: sermon.date ? new Date(sermon.date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" }) : "",
        thumbnail: sermon.thumbnailUrl || "/assets/img/sermons/default.jpg",
        category: sermon.category || "Sunday Service",
        videoUrl: sermon.videoUrl, // We map videoUrl in case the card needs it for a link
        duration: "", // Optional since we don't have duration from YT
    }));

    const filteredItems = activeCategory === "All"
        ? mappedItems
        : mappedItems.filter(item => item.category === activeCategory)


    return (
        <section className="pb-24 min-h-screen bg-background">
            <MediaFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    <AnimatePresence mode="popLayout">
                        {status === "LoadingFirstPage" ? (
                            // Show skeletons while loading first page
                            Array.from({ length: 9 }).map((_, i) => (
                                <motion.div
                                    key={`skeleton-${i}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <MediaCardSkeleton />
                                </motion.div>
                            ))
                        ) : filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <MediaCard item={item as any} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-muted-foreground">
                                <p>No media found in this category.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {status === "CanLoadMore" && (
                    <div className="mt-12 flex justify-center">
                        <Button
                            onClick={() => loadMore(9)}
                            size="lg"
                            variant="outline"
                            className="px-8 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                            Load More Sermons
                        </Button>
                    </div>
                )}
                {status === "LoadingMore" && (
                    <div className="mt-12 flex justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                )}
            </div>
        </section>
    )
}
