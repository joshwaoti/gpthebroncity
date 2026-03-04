"use client"

import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/../convex/_generated/api"
import { Id } from "@/../convex/_generated/dataModel"
import Link from "next/link"
import { ArrowLeft, CalendarDays, MapPin, Clock, Share2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { cn } from "@/lib/utils"
import { AddToCalendar } from "@/components/events/add-to-calendar"

const CATEGORY_STYLES: Record<string, { bg: string; gradient: string; text: string; icon: string; lightText: string }> = {
    Service: { bg: "bg-green-900/20", gradient: "from-green-900/40 to-black", text: "dark:text-green-400", lightText: "text-green-800", icon: "⛪" },
    Fellowship: { bg: "bg-blue-900/20", gradient: "from-blue-900/40 to-black", text: "dark:text-blue-400", lightText: "text-blue-800", icon: "🤝" },
    Worship: { bg: "bg-purple-900/20", gradient: "from-purple-900/40 to-black", text: "dark:text-purple-400", lightText: "text-purple-800", icon: "🙏" },
    Kids: { bg: "bg-orange-900/20", gradient: "from-orange-900/40 to-black", text: "dark:text-orange-400", lightText: "text-orange-800", icon: "👶" },
    Leadership: { bg: "bg-yellow-900/20", gradient: "from-yellow-900/40 to-black", text: "dark:text-yellow-400", lightText: "text-yellow-800", icon: "👑" },
    Holiday: { bg: "bg-red-900/20", gradient: "from-red-900/40 to-black", text: "dark:text-red-400", lightText: "text-red-800", icon: "🎉" },
    Family: { bg: "bg-pink-900/20", gradient: "from-pink-900/40 to-black", text: "dark:text-pink-400", lightText: "text-pink-800", icon: "👨‍👩‍👧" },
    Youth: { bg: "bg-indigo-900/20", gradient: "from-indigo-900/40 to-black", text: "dark:text-indigo-400", lightText: "text-indigo-800", icon: "⚡" },
}

export default function EventDetailPage() {
    const params = useParams()
    const id = params.id as string

    // Always call hook at top level (never inside try/catch)
    const event = useQuery(api.events.getById, { id: id as Id<"events"> })

    if (event === undefined) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-24 pb-20 container mx-auto px-4">
                    <div className="animate-pulse space-y-6">
                        <div className="h-12 bg-muted rounded-xl w-2/3" />
                        <div className="h-64 bg-muted rounded-2xl" />
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-muted rounded-xl" />)}
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        )
    }

    if (!event) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-24 pb-20 container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
                    <p className="text-muted-foreground mb-8">This event doesn't exist or may have been removed.</p>
                    <Link href="/events">
                        <Button><ArrowLeft className="w-4 h-4 mr-2" /> Back to Events</Button>
                    </Link>
                </div>
                <Footer />
            </main>
        )
    }

    const category = event.category ?? "Service";
    const style = CATEGORY_STYLES[category] ?? CATEGORY_STYLES["Service"];
    const dateObj = new Date(event.date + "T00:00:00");
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const monthShort = dateObj.toLocaleString("default", { month: "short" }).toUpperCase();
    const year = dateObj.getFullYear();
    const weekday = dateObj.toLocaleString("default", { weekday: "long" });

    const endDateObj = event.endDate ? new Date(event.endDate + "T00:00:00") : null;
    const isMultiDay = !!endDateObj;
    const isPast = event.date < new Date().toISOString().split("T")[0];

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 pb-20">
                {/* Hero Banner - imageless, gradient-based */}
                <div className={cn(
                    "relative w-full overflow-hidden",
                    "bg-gradient-to-br",
                    style.gradient
                )} style={{ minHeight: "280px" }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

                    {/* Big icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <span className="text-[200px] select-none">{style.icon}</span>
                    </div>

                    <div className="relative container mx-auto px-4 py-16">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm mb-6">
                            <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                                <ArrowLeft className="w-3.5 h-3.5" /> Events
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground truncate">{event.title}</span>
                        </div>

                        <div className="flex items-start gap-4 flex-wrap">
                            {/* Date block */}
                            <div className="bg-card/90 dark:bg-black/70 backdrop-blur rounded-2xl p-4 text-center min-w-[80px] border border-border shadow-lg">
                                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    {dateObj.toLocaleString("default", { weekday: "short" }).toUpperCase()}
                                </span>
                                <span className="block text-4xl font-bold text-[#257300] dark:text-[#B2CB20] leading-tight">{day}</span>
                                <span className="block text-[11px] font-bold text-gold uppercase tracking-widest">{monthShort}</span>
                                <span className="block text-[10px] text-muted-foreground">{year}</span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge className={cn("border-none font-semibold text-sm px-3 py-1", style.text, style.lightText)}>
                                        {style.icon} {category}
                                    </Badge>
                                    {isPast && (
                                        <Badge variant="outline" className="text-muted-foreground border-muted text-sm">
                                            Past Event
                                        </Badge>
                                    )}
                                    {isMultiDay && (
                                        <Badge variant="outline" className="text-muted-foreground border-muted text-sm">
                                            Multi-day Event
                                        </Badge>
                                    )}
                                </div>
                                <h1 className="font-display text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                    {event.title}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Quick info cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#257300]/10 flex items-center justify-center flex-shrink-0">
                                        <CalendarDays className="w-4 h-4 text-[#257300] dark:text-[#B2CB20]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Date</p>
                                        <p className="text-sm font-medium">{weekday}, {month} {day}</p>
                                        {isMultiDay && <p className="text-xs text-muted-foreground">to {endDateObj!.toLocaleDateString("default", { month: "long", day: "numeric" })}</p>}
                                    </div>
                                </div>

                                {event.location && (
                                    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-[#257300]/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-4 h-4 text-[#257300] dark:text-[#B2CB20]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Location</p>
                                            <p className="text-sm font-medium">{event.location}</p>
                                        </div>
                                    </div>
                                )}

                                {(event.startTime || event.endTime) && (
                                    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-[#257300]/10 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-4 h-4 text-[#257300] dark:text-[#B2CB20]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Time</p>
                                            <p className="text-sm font-medium">
                                                {event.startTime}{event.endTime ? ` – ${event.endTime}` : ""}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            {event.description && (
                                <div className="bg-card border border-border rounded-2xl p-6">
                                    <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4">About This Event</h2>
                                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                                </div>
                            )}

                            {/* Share */}
                            <div className="flex items-center gap-4 pt-4 border-t border-border">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Share this event</span>
                                <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-4">
                            <div className={cn("rounded-2xl border border-border p-6 sticky top-28", style.bg)}>
                                <div className="text-5xl mb-4 text-center">{style.icon}</div>
                                <h3 className={cn("text-xl font-bold text-center mb-2", style.text)}>{category}</h3>
                                <p className="text-sm text-center text-muted-foreground mb-6">
                                    {isMultiDay
                                        ? `${day} ${month} – ${endDateObj!.toLocaleDateString("default", { month: "long", day: "numeric" })} ${year}`
                                        : `${weekday}, ${month} ${day}, ${year}`
                                    }
                                </p>

                                {!isPast ? (
                                    <AddToCalendar event={{
                                        title: event.title,
                                        description: event.description,
                                        location: event.location,
                                        date: event.date,
                                        endDate: event.endDate,
                                        startTime: event.startTime,
                                        endTime: event.endTime
                                    }} />
                                ) : (
                                    <div className="bg-muted text-muted-foreground text-sm text-center rounded-lg p-3 mb-3">
                                        This event has already taken place
                                    </div>
                                )}

                                <Link href="/events">
                                    <Button variant="outline" className="w-full gap-2">
                                        <ArrowLeft className="w-4 h-4" /> All Events
                                    </Button>
                                </Link>
                            </div>

                            {/* Location placeholder if available */}
                            {event.location && !event.location.includes("GPT") && (
                                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                                    <div className="h-[180px] bg-muted flex items-center justify-center">
                                        <div className="text-center">
                                            <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                            <p className="text-sm text-muted-foreground">{event.location}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
