
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/events/event-card"

const UPCOMING_EVENTS = [
    {
        id: "1",
        title: "Sunday Service: The Power of Faith",
        date: new Date(2026, 1, 22),
        location: "Main Sanctuary, Utawala",
        category: "Service",
        slug: "sunday-service-faith",
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
    }
]

export function UpcomingEvents() {
    return (
        <section className="py-24 bg-background dark:bg-black/50 relative">
            {/* Subtle pattern */}
            <div className="absolute inset-0 section-pattern dark:opacity-0 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-[2px] bg-gold" />
                            <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">
                                Calendar
                            </span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-medium text-gray-900 dark:text-white">
                            Upcoming Events
                        </h2>
                    </div>
                    <Link href="/events">
                        <Button variant="link" className="text-[#257300] dark:text-[#B2CB20] gap-2">
                            View Full Calendar <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {UPCOMING_EVENTS.map(event => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>
            </div>
        </section>
    )
}
