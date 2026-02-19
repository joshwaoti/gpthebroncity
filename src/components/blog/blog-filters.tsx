
"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BlogFiltersProps {
    categories: string[]
    activeCategory: string
    onCategoryChange: (category: string) => void
}

export function BlogFilters({
    categories,
    activeCategory,
    onCategoryChange
}: BlogFiltersProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <Button
                variant={activeCategory === 'All' ? 'default' : 'outline'}
                onClick={() => onCategoryChange('All')}
                className={cn(
                    "rounded-full px-6",
                    activeCategory === 'All'
                        ? "bg-[#257300] hover:bg-[#257300]/90 text-white"
                        : "hover:border-[#257300] hover:text-[#257300]"
                )}
            >
                All Topics
            </Button>
            {categories.map((category) => (
                <Button
                    key={category}
                    variant={activeCategory === category ? 'default' : 'outline'}
                    onClick={() => onCategoryChange(category)}
                    className={cn(
                        "rounded-full px-6",
                        activeCategory === category
                            ? "bg-[#257300] hover:bg-[#257300]/90 text-white"
                            : "hover:border-[#257300] hover:text-[#257300]"
                    )}
                >
                    {category}
                </Button>
            ))}
        </div>
    )
}
