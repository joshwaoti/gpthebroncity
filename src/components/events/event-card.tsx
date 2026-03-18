"use client"

import Link from "next/link"
import { CalendarDays, MapPin, ArrowRight, Clock, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AddToCalendar } from "./add-to-calendar"

interface EventCardProps {
    _id?: string
    id?: string
    title: string
    date: Date | string
    endDate?: string
    location?: string
    category?: string
    imageUrl?: string
    image?: string
    slug?: string
    featured?: boolean
    description?: string
    startTime?: string
    endTime?: string
    requiresRegistration?: boolean
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string; icon: string; lightText: string }> = {
    Service: { bg: "from-green-700/20 to-green-900/30", text: "dark:text-green-400", lightText: "text-green-800", icon: "⛪" },
    Fellowship: { bg: "from-blue-700/20 to-blue-900/30", text: "dark:text-blue-400", lightText: "text-blue-800", icon: "🤝" },
    Worship: { bg: "from-purple-700/20 to-purple-900/30", text: "dark:text-purple-400", lightText: "text-purple-800", icon: "🙏" },
    Kids: { bg: "from-orange-700/20 to-orange-900/30", text: "dark:text-orange-400", lightText: "text-orange-800", icon: "👶" },
    Leadership: { bg: "from-yellow-700/20 to-yellow-900/30", text: "dark:text-yellow-400", lightText: "text-yellow-800", icon: "👑" },
    Holiday: { bg: "from-red-700/20 to-red-900/30", text: "dark:text-red-400", lightText: "text-red-800", icon: "🎉" },
    Family: { bg: "from-pink-700/20 to-pink-900/30", text: "dark:text-pink-400", lightText: "text-pink-800", icon: "👨‍👩‍👧" },
    Youth: { bg: "from-indigo-700/20 to-indigo-900/30", text: "dark:text-indigo-400", lightText: "text-indigo-800", icon: "⚡" },
}

export function EventCard({
    _id,
    id,
    title,
    date,
    endDate,
    location,
    category = "Service",
    imageUrl,
    image,
    slug,
    featured = false,
    description,
    startTime,
    endTime,
    requiresRegistration,
}: EventCardProps) {
    const dateObj = typeof date === "string" ? new Date(date + "T00:00:00") : date;
    const day = dateObj.getDate()
    const month = dateObj.toLocaleString("default", { month: "short" }).toUpperCase()
    const weekday = dateObj.toLocaleString("default", { weekday: "short" }).toUpperCase()
    const year = dateObj.getFullYear()

    const isMultiDay = !!endDate;
    const endDateObj = endDate ? new Date(endDate + "T00:00:00") : null;
    const endDay = endDateObj?.getDate();
    const endMonth = endDateObj?.toLocaleString("default", { month: "short" })?.toUpperCase();

    const eventLink = slug ? `/events/${slug}` : `/events/${_id || id}`;
    const style = CATEGORY_STYLES[category] ?? CATEGORY_STYLES["Service"];
    
    const isAutoImported = description && description.toLowerCase().includes("automatically imported");
    const displayDescription = !isAutoImported ? description : null;

    return (
        <Link href={eventLink} className="group block h-full">
            <div className={cn(
                "relative h-full overflow-hidden rounded-2xl border border-border dark:border-white/10",
                "bg-gradient-to-br", style.bg,
                "hover:border-[#257300]/40 transition-all duration-300",
                "hover:shadow-lg hover:shadow-[#257300]/10 hover:-translate-y-0.5",
                featured && "md:col-span-2"
            )}>
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#257300] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-6 flex flex-col h-full">
                    {/* Date + Category badge */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                        {/* Date block */}
                        <div className="bg-card dark:bg-black/40 backdrop-blur rounded-xl p-3 text-center min-w-[64px] border border-border dark:border-white/10 shadow-sm">
                            <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{weekday}</span>
                            <span className="block text-3xl font-bold text-[#257300] dark:text-[#B2CB20] leading-tight">{day}</span>
                            <span className="block text-[10px] font-bold text-gold uppercase tracking-widest">{month}</span>
                            {isMultiDay && (
                                <>
                                    <span className="block text-[9px] text-muted-foreground my-0.5">—</span>
                                    <span className="block text-xl font-bold text-[#257300] dark:text-[#B2CB20] leading-tight">{endDay}</span>
                                    <span className="block text-[10px] font-bold text-gold uppercase tracking-widest">{endMonth}</span>
                                </>
                            )}
                        </div>

                        {/* Icon + category */}
                        <div className="flex flex-col items-end gap-2">
                            <span className="text-3xl">{style.icon}</span>
                            <Badge className={cn("text-[10px] px-2 py-0.5 border-none font-semibold", style.text, style.lightText)}>
                                {category}
                            </Badge>
                            {requiresRegistration && (
                                <Badge className="text-[10px] px-2 py-0.5 bg-[#257300]/10 text-[#257300] dark:text-[#B2CB20] border border-[#257300]/20 gap-1 font-semibold">
                                    <ClipboardList className="w-2.5 h-2.5" />
                                    Register
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className={cn(
                        "font-display font-semibold text-gray-900 dark:text-white mb-3",
                        "group-hover:text-[#257300] dark:group-hover:text-[#B2CB20] transition-colors",
                        "line-clamp-2",
                        featured ? "text-2xl" : "text-lg"
                    )}>
                        {title}
                    </h3>

                    {/* Description */}
                    {displayDescription && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{displayDescription}</p>
                    )}

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            {location && (
                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <MapPin className="w-3 h-3 text-[#257300] dark:text-[#B2CB20] flex-shrink-0" />
                                    <span className="truncate max-w-[150px]">{location}</span>
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <CalendarDays className="w-3 h-3 text-[#257300] dark:text-[#B2CB20] flex-shrink-0" />
                                {isMultiDay ? `${day} ${month} – ${endDay} ${endMonth} ${year}` : `${day} ${month} ${year}`}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <AddToCalendar
                                variant="icon"
                                className="text-muted-foreground hover:text-[#257300] dark:hover:text-[#B2CB20]"
                                event={{
                                    title,
                                    description: displayDescription ?? undefined,
                                    location,
                                    date: typeof date === "string" ? date : date.toISOString().split("T")[0],
                                    endDate,
                                    startTime,
                                    endTime,
                                }}
                            />
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#257300] dark:group-hover:text-[#B2CB20] group-hover:translate-x-1 transition-all" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
