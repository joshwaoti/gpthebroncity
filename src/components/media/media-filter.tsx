"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface MediaFilterProps {
    activeCategory: string
    onCategoryChange: (category: string) => void
}

const categories = ["All", "Sermons", "Worship", "Special"]

export function MediaFilter({ activeCategory, onCategoryChange }: MediaFilterProps) {
    return (
        <div className="sticky top-20 z-30 w-full py-4 bg-background/80 backdrop-blur-xl border-b border-border/50 mb-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Categories */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                                activeCategory === category
                                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                                    : "bg-secondary/10 text-muted-foreground hover:bg-secondary/20 hover:text-foreground"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Search & Filter Controls */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search sermons, series..."
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary/5 border border-border focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        />
                    </div>
                    <Button variant="outline" size="icon" className="shrink-0 rounded-full">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
