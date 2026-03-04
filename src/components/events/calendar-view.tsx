
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const CATEGORY_COLORS: Record<string, string> = {
    Service: "bg-green-500/20 text-green-600 dark:text-green-400",
    Fellowship: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
    Worship: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
    Kids: "bg-orange-500/20 text-orange-600 dark:text-orange-400",
    Leadership: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
    Holiday: "bg-red-500/20 text-red-600 dark:text-red-400",
    Family: "bg-pink-500/20 text-pink-600 dark:text-pink-400",
    Youth: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
}

interface CalendarEvent {
    _id?: string
    id?: string
    title: string
    date: string | Date
    endDate?: string
    category?: string
    slug?: string
}

interface CalendarViewProps {
    events: CalendarEvent[]
}

export function CalendarView({ events }: CalendarViewProps) {
    const today = new Date()
    const [viewMonth, setViewMonth] = useState(today.getMonth())
    const [viewYear, setViewYear] = useState(today.getFullYear())

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

    const monthName = new Date(viewYear, viewMonth, 1).toLocaleString("default", { month: "long" })

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    }
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    }

    const getEventsForDay = (day: number) => {
        return events.filter(event => {
            const dateStr = typeof event.date === "string" ? event.date : event.date.toISOString().split("T")[0]
            const [eYear, eMonth, eDay] = dateStr.split("-").map(Number)

            // Check if this day is within the event's range
            const dayDate = new Date(viewYear, viewMonth, day)
            const startDate = new Date(eYear, eMonth - 1, eDay)

            if (event.endDate) {
                const [endY, endM, endD] = event.endDate.split("-").map(Number)
                const endDate = new Date(endY, endM - 1, endD)
                return dayDate >= startDate && dayDate <= endDate &&
                    eYear === viewYear || (dayDate >= startDate && dayDate <= endDate)
            }

            return eDay === day && (eMonth - 1) === viewMonth && eYear === viewYear
        })
    }

    return (
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden shadow-sm">
            {/* Month navigation header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/10 bg-gray-50/50 dark:bg-black/20">
                <button
                    onClick={prevMonth}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
                    {monthName} {viewYear}
                </h3>
                <button
                    onClick={nextMonth}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                    <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-black/5 dark:border-white/10">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 auto-rows-fr">
                {emptyDays.map(i => (
                    <div key={`empty-${i}`} className="min-h-[100px] bg-gray-50/20 dark:bg-white/[0.02] border-r border-b border-black/5 dark:border-white/5" />
                ))}

                {days.map(day => {
                    const dayEvents = getEventsForDay(day)
                    const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()
                    const isPast = new Date(viewYear, viewMonth, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())

                    return (
                        <div key={day} className={cn(
                            "min-h-[100px] p-2 border-r border-b border-black/5 dark:border-white/5 transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.02]",
                            isToday ? "bg-[#257300]/5 dark:bg-[#257300]/10" : "",
                            isPast ? "opacity-60" : ""
                        )}>
                            <div className="flex justify-between items-start mb-1">
                                <span className={cn(
                                    "w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium",
                                    isToday
                                        ? "bg-[#257300] text-white"
                                        : "text-gray-700 dark:text-gray-300"
                                )}>
                                    {day}
                                </span>
                                {dayEvents.length > 2 && (
                                    <span className="text-[10px] text-muted-foreground font-medium">
                                        +{dayEvents.length - 2}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-0.5">
                                {dayEvents.slice(0, 2).map(event => {
                                    const eventLink = event.slug
                                        ? `/events/${event.slug}`
                                        : `/events/${event._id || event.id}`;
                                    const colorClass = CATEGORY_COLORS[event.category ?? "Service"] ?? "bg-gray-500/20 text-gray-600";
                                    return (
                                        <Link
                                            key={event._id || event.id}
                                            href={eventLink}
                                            className={cn(
                                                "block text-[10px] px-1.5 py-1 rounded-md truncate transition-opacity hover:opacity-80 leading-tight font-medium",
                                                colorClass
                                            )}
                                            title={event.title}
                                        >
                                            {event.title}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
