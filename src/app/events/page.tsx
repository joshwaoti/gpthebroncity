
"use client"

import { useState } from "react"
import { CalendarDays, MapPin } from "lucide-react"
import { EventCard } from "@/components/events/event-card"
import { EventFilters } from "@/components/events/events-filter"
import { CalendarView } from "@/components/events/calendar-view"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

// Dummy Data
const EVENTS = [
    {
        id: "1",
        title: "Sunday Service: The Power of Faith",
        date: new Date(2026, 1, 22),
        location: "Main Sanctuary, Utawala",
        category: "Service",
        slug: "sunday-service-faith",
        featured: true,
        image: "/assets/img/events.jpg"
    },
    {
        id: "2",
        title: "Men's Breakfast Fellowship",
        date: new Date(2026, 1, 28),
        location: "Hebron City Hall",
        category: "Fellowship",
        slug: "mens-breakfast",
        featured: false,
        image: "/assets/img/events.jpg"
    },
    {
        id: "3",
        title: "Worship Night: Encounter",
        date: new Date(2026, 2, 6),
        location: "Main Sanctuary",
        category: "Worship",
        slug: "worship-night",
        featured: false,
        image: "/assets/img/events.jpg"
    },
    {
        id: "4",
        title: "Children's Church Fun Day",
        date: new Date(2026, 2, 14),
        location: "Children's Block",
        category: "Kids",
        slug: "kids-fun-day",
        featured: false,
        image: "/assets/img/events.jpg"
    },
    {
        id: "5",
        title: "Leadership Summit 2026",
        date: new Date(2026, 2, 20),
        location: "Conference Center",
        category: "Leadership",
        slug: "leadership-summit",
        featured: false,
        image: "/assets/img/events.jpg"
    }
]

const CATEGORIES = ["Service", "Fellowship", "Worship", "Kids", "Leadership"]

export default function EventsPage() {
    const [view, setView] = useState<'list' | 'calendar'>('list')
    const [activeCategory, setActiveCategory] = useState('All')

    const filteredEvents = EVENTS.filter(event =>
        activeCategory === 'All' || event.category === activeCategory
    )

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 pb-20">
                {/* Hero Section */}
                <section className="container mx-auto px-4 mb-12">
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
                </section>

                {/* Filters & View Toggle */}
                <section className="container mx-auto px-4">
                    <EventFilters
                        categories={CATEGORIES}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                        view={view}
                        onViewChange={setView}
                    />

                    {/* Event Content */}
                    {view === 'list' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    {...event}
                                />
                            ))}
                        </div>
                    ) : (
                        <CalendarView events={filteredEvents} />
                    )}

                    {/* Empty State */}
                    {filteredEvents.length === 0 && (
                        <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
                            <CalendarDays className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                                No events found
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
            </div>
            <Footer />
        </main>
    )
}
