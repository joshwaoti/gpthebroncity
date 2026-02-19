
import Link from "next/link"
import { CalendarDays, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface EventCardProps {
    title: string
    date: Date
    location: string
    category: string
    image?: string
    slug: string
    featured?: boolean
}

export function EventCard({
    title,
    date,
    location,
    category,
    image,
    slug,
    featured = false,
}: EventCardProps) {
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase()

    return (
        <div className={cn(
            "group relative overflow-hidden rounded-2xl bg-card dark:bg-white/5 border border-border dark:border-white/10 hover:border-[#257300]/30 dark:hover:border-[#257300]/40 card-hover",
            featured ? "col-span-1 md:col-span-2 lg:col-span-2 row-span-2" : ""
        )}>
            {/* Gold accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#257300] via-gold to-[#257300] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            <div className={cn(
                "relative overflow-hidden",
                featured ? "aspect-[21/9]" : "aspect-[16/9]"
            )}>
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-border dark:from-white/5 dark:to-white/10" />
                )}

                {/* Date Badge — gold tint */}
                <div className="absolute top-4 left-4 bg-card/95 dark:bg-black/95 backdrop-blur-sm rounded-xl p-3 text-center min-w-[70px] shadow-lg border border-gold/20">
                    <span className="block text-2xl font-bold text-[#257300] dark:text-[#B2CB20] leading-none mb-1">
                        {day}
                    </span>
                    <span className="block text-[10px] font-bold text-gold uppercase tracking-wider">
                        {month}
                    </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-[#257300]/90 hover:bg-[#257300] text-white border-none shadow-sm backdrop-blur-sm">
                        {category}
                    </Badge>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4 text-[#257300] dark:text-[#B2CB20]" />
                    <span>{location}</span>
                </div>

                <h3 className={cn(
                    "font-display font-medium text-gray-900 dark:text-white mb-4 group-hover:text-[#257300] dark:group-hover:text-[#B2CB20] transition-colors",
                    featured ? "text-3xl" : "text-xl"
                )}>
                    {title}
                </h3>

                <Link href={`/events/${slug}`}>
                    <Button variant={featured ? "default" : "outline"} className={cn(
                        "w-full sm:w-auto gap-2 group/btn"
                    )}>
                        Event Details
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}
