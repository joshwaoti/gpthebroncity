"use client"

import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"

interface MediaFilterProps {
    searchQuery: string
    onSearchChange: (query: string) => void
}

export function MediaFilter({ searchQuery, onSearchChange }: MediaFilterProps) {
    return (
        <div className="sticky top-20 z-30 w-full py-4 bg-background/80 backdrop-blur-xl border-b border-border/50 mb-8">
            <div className="container mx-auto px-4 flex items-center justify-end gap-3">
                {/* Search & Filter Controls */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search sermons, series..."
                            className="w-full pl-10 pr-10 py-2 rounded-full bg-secondary/5 border border-border focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <Button variant="outline" size="icon" className="shrink-0 rounded-full">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
