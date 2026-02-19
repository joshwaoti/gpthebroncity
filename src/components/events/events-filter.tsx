
"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EventFiltersProps {
    categories: string[]
    activeCategory: string
    onCategoryChange: (category: string) => void
    view: 'list' | 'calendar'
    onViewChange: (view: 'list' | 'calendar') => void
}

export function EventFilters({
    categories,
    activeCategory,
    onCategoryChange,
    view,
    onViewChange
}: EventFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
                <Button
                    variant={activeCategory === 'All' ? 'default' : 'outline'}
                    onClick={() => onCategoryChange('All')}
                    className={cn(
                        "rounded-full",
                        activeCategory === 'All' ? "bg-[#257300] hover:bg-[#257300]/90" : "hover:text-[#257300]"
                    )}
                >
                    All Events
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? 'default' : 'outline'}
                        onClick={() => onCategoryChange(category)}
                        className={cn(
                            "rounded-full whitespace-nowrap",
                            activeCategory === category ? "bg-[#257300] hover:bg-[#257300]/90" : "hover:text-[#257300]"
                        )}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
                <button
                    onClick={() => onViewChange('list')}
                    className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-all",
                        view === 'list'
                            ? "bg-white dark:bg-gray-800 shadow-sm text-[#257300] dark:text-[#B2CB20]"
                            : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    )}
                >
                    List View
                </button>
                <button
                    onClick={() => onViewChange('calendar')}
                    className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-all",
                        view === 'calendar'
                            ? "bg-white dark:bg-gray-800 shadow-sm text-[#257300] dark:text-[#B2CB20]"
                            : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    )}
                >
                    Calendar
                </button>
            </div>
        </div>
    )
}
