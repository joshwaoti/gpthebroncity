"use client"

import { useState } from "react"
import { MediaCard } from "./media-card"
import { MediaFilter } from "./media-filter"
import { mediaData } from "@/data"
import { motion, AnimatePresence } from "framer-motion"

export function MediaGrid() {
    const [activeCategory, setActiveCategory] = useState("All")

    const filteredItems = activeCategory === "All"
        ? mediaData.items
        : mediaData.items.filter(item => item.category === activeCategory)

    return (
        <section className="pb-24 min-h-screen bg-background">
            <MediaFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <MediaCard item={item} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>No media found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
