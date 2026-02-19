import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, MapPin, Clock, User, Mail, ArrowRight, Share2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { ALL_EVENTS, getEventBySlug, getUpcomingEvents } from "@/data/events"

export function generateStaticParams() {
    return ALL_EVENTS.map((event) => ({
        slug: event.slug,
    }))
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const event = getEventBySlug(slug)

    if (!event) {
        notFound()
    }

    const upcomingEvents = getUpcomingEvents(event.slug, 3)

    const day = event.date.getDate()
    const month = event.date.toLocaleString("default", { month: "long" })
    const year = event.date.getFullYear()
    const weekday = event.date.toLocaleString("default", { weekday: "long" })
    const startTime = event.date.toLocaleString("default", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 pb-20">
                {/* Hero Image */}
                <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Back button */}
                    <div className="absolute top-6 left-6 z-10">
                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> All Events
                        </Link>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-6 right-6 z-10">
                        <Badge className="bg-[#257300] text-white border-none text-sm px-4 py-1.5">
                            {event.category}
                        </Badge>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <div className="container mx-auto">
                            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl">
                                {event.title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-4 mt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Quick Info Bar */}
                            <div className="flex flex-wrap gap-6 mb-10 p-6 rounded-2xl bg-card dark:bg-white/5 border border-border dark:border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#257300]/10 dark:bg-[#257300]/20 flex items-center justify-center">
                                        <CalendarDays className="w-5 h-5 text-[#257300] dark:text-[#B2CB20]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                                            {weekday}, {month} {day}, {year}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#257300]/10 dark:bg-[#257300]/20 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-[#257300] dark:text-[#B2CB20]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Time</p>
                                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                                            {startTime} {event.endTime ? `– ${event.endTime}` : ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#257300]/10 dark:bg-[#257300]/20 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-[#257300] dark:text-[#B2CB20]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
                                        <p className="font-medium text-gray-900 dark:text-white text-sm">{event.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-10">
                                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    About This Event
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                    {event.description}
                                </p>
                            </div>

                            {/* Event Details */}
                            <div className="mb-10">
                                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    What to Expect
                                </h2>
                                <ul className="space-y-3">
                                    {event.details.map((detail, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#257300] dark:text-[#B2CB20] mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-600 dark:text-gray-300">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Share */}
                            <div className="flex items-center gap-4 pt-6 border-t border-border">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Share this event</span>
                                <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Registration CTA */}
                            <div className="bg-card dark:bg-white/5 rounded-2xl border border-border dark:border-white/10 p-6 sticky top-28">
                                {/* Date badge */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-[#257300]/10 dark:bg-[#257300]/20 rounded-2xl p-4 text-center min-w-[80px]">
                                        <span className="block text-3xl font-bold text-[#257300] dark:text-[#B2CB20] leading-none">
                                            {day}
                                        </span>
                                        <span className="block text-xs font-bold text-gold uppercase tracking-wider mt-1">
                                            {month.slice(0, 3).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{weekday}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {startTime} {event.endTime ? `– ${event.endTime}` : ""}
                                        </p>
                                    </div>
                                </div>

                                {event.registrationLink ? (
                                    <Link href={event.registrationLink}>
                                        <Button className="w-full gap-2 mb-4" size="lg">
                                            Register Now <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button className="w-full gap-2 mb-4" size="lg">
                                        Add to Calendar <CalendarDays className="w-4 h-4" />
                                    </Button>
                                )}

                                {/* Organizer Info */}
                                <div className="pt-4 border-t border-border space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <User className="w-4 h-4 text-gold flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Organized by</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{event.organizer}</p>
                                        </div>
                                    </div>
                                    {event.contact && (
                                        <div className="flex items-center gap-3 text-sm">
                                            <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider">Contact</p>
                                                <a
                                                    href={`mailto:${event.contact}`}
                                                    className="font-medium text-[#257300] dark:text-[#B2CB20] hover:underline"
                                                >
                                                    {event.contact}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 text-sm">
                                        <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Venue</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{event.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps Embed */}
                            <div className="rounded-2xl overflow-hidden border border-border dark:border-white/10 h-[200px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818!2d36.966!3d-1.2756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13f1a20c0001%3A0x82d04d47dcb2e2e1!2sGPT%20Hebron%20City!5e0!3m2!1sen!2ske!4v1708300000000!5m2!1sen!2ske"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Event Location"
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Events Section */}
                {upcomingEvents.length > 0 && (
                    <section className="container mx-auto px-4 mt-24">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-[2px] bg-gold" />
                            <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">
                                Don't Miss
                            </span>
                        </div>
                        <div className="flex items-end justify-between mb-10">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                                More Upcoming Events
                            </h2>
                            <Link href="/events">
                                <Button variant="link" className="text-[#257300] dark:text-[#B2CB20] gap-2">
                                    View All <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {upcomingEvents.map((upEvent) => {
                                const upDay = upEvent.date.getDate()
                                const upMonth = upEvent.date
                                    .toLocaleString("default", { month: "short" })
                                    .toUpperCase()
                                return (
                                    <Link key={upEvent.id} href={`/events/${upEvent.slug}`} className="group">
                                        <div className="bg-card dark:bg-white/5 rounded-2xl border border-border dark:border-white/10 overflow-hidden card-hover">
                                            <div className="aspect-[16/9] overflow-hidden relative">
                                                <img
                                                    src={upEvent.image}
                                                    alt={upEvent.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                {/* Date badge */}
                                                <div className="absolute top-3 left-3 bg-white/95 dark:bg-black/90 backdrop-blur-sm rounded-xl p-2.5 text-center min-w-[55px]">
                                                    <span className="block text-xl font-bold text-[#257300] dark:text-[#B2CB20] leading-none">
                                                        {upDay}
                                                    </span>
                                                    <span className="block text-[9px] font-bold text-gold uppercase tracking-wider">
                                                        {upMonth}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <span className="text-xs text-gold font-bold uppercase tracking-wider">
                                                    {upEvent.category}
                                                </span>
                                                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mt-1 mb-2 group-hover:text-[#257300] dark:group-hover:text-[#B2CB20] transition-colors line-clamp-2">
                                                    {upEvent.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {upEvent.location}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </section>
                )}
            </div>
            <Footer />
        </main>
    )
}
