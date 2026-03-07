
"use client"

import { useState } from "react"
import { CalendarDays, MapPin } from "lucide-react"
import { EventCard } from "@/components/events/event-card"
import { EventFilters } from "@/components/events/events-filter"
import { CalendarView } from "@/components/events/calendar-view"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { usePaginatedQuery, useQuery } from "convex/react"
import { api } from "@/../convex/_generated/api"

const CATEGORIES = ["Service", "Fellowship", "Worship", "Kids", "Leadership", "Holiday", "Family", "Youth"]

export default function EventsPage() {
    const [view, setView] = useState<'list' | 'calendar'>('list')
    const [activeCategory, setActiveCategory] = useState('All')

    // Paginated query for list view
    const { results: filteredEvents, status, loadMore } = usePaginatedQuery(
        api.events.getPaginated,
        { category: activeCategory === 'All' ? undefined : activeCategory },
        { initialNumItems: 9 }
    );

    // Non-paginated query for calendar view — covers all months
    const calendarEvents = useQuery(
        api.events.getForCalendar,
        { category: activeCategory === 'All' ? undefined : activeCategory }
    );

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            {/* Hero with gradient background for navbar visibility */}
            <div className="relative pt-24 pb-16 overflow-hidden">
                {/* Gradient blobs for light mode visibility */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#257300]/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#257300]/5 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-[2px] bg-gold" />
                            <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">Calendar</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-medium text-gray-900 dark:text-white mb-4">
                            Upcoming <span className="text-[#257300] dark:text-[#B2CB20]">Events</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Join us for worship, fellowship, and community growth.
                            There's something for everyone at GPT Hebron City.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters & View Toggle */}
            <section className="container mx-auto px-4 -mt-4">
                <EventFilters
                    categories={CATEGORIES}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    view={view}
                    onViewChange={setView}
                />

                {/* Event Content */}
                {view === 'list' ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {status === "LoadingFirstPage" ? (
                                Array(6).fill(null).map((_, i) => (
                                    <div key={i} className="animate-pulse bg-card dark:bg-white/5 border border-border dark:border-white/10 rounded-2xl h-[400px]">
                                        <div className="w-full aspect-[16/9] bg-muted dark:bg-white/10 rounded-t-2xl" />
                                        <div className="p-6 space-y-4">
                                            <div className="h-4 bg-muted dark:bg-white/10 rounded w-1/3" />
                                            <div className="h-6 bg-muted dark:bg-white/10 rounded w-3/4" />
                                            <div className="h-10 bg-muted dark:bg-white/10 rounded w-32 mt-4" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                filteredEvents.map((event) => (
                                    <EventCard
                                        key={event._id}
                                        {...event}
                                        date={event.date}
                                        startTime={event.startTime}
                                        endTime={event.endTime}
                                    />
                                ))
                            )}
                        </div>

                        {status === "CanLoadMore" && (
                            <div className="flex justify-center mt-12">
                                <Button
                                    onClick={() => loadMore(9)}
                                    variant="outline"
                                    className="gap-2 border-[#257300] text-[#257300] hover:bg-[#257300] hover:text-white"
                                >
                                    Load More Events
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <CalendarView events={calendarEvents ?? []} />
                )}

                {/* Empty State — only for list view */}
                {view === 'list' && status !== "LoadingFirstPage" && filteredEvents.length === 0 && (
                    <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                        <CalendarDays className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            No upcoming events found
                        </h3>
                        <p className="text-muted-foreground">
                            Try adjusting your filters or check back later.
                        </p>
                        <Button
                            variant="link"
                            className="mt-4 text-[#257300]"
                            onClick={() => setActiveCategory('All')}
                        >
                            View all events
                        </Button>
                    </div>
                )}
            </section>
            <Footer />
        </main>
    )
}
