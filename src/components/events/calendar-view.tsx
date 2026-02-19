
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CalendarEvent {
    id: string
    title: string
    date: Date
    category: string
    slug: string
}

interface CalendarViewProps {
    events: CalendarEvent[]
}

export function CalendarView({ events }: CalendarViewProps) {
    // Get current month details
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    // Create array of days
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

    const getEventsForDay = (day: number) => {
        return events.filter(event => {
            const eventDate = new Date(event.date)
            return eventDate.getDate() === day &&
                eventDate.getMonth() === currentMonth &&
                eventDate.getFullYear() === currentYear
        })
    }

    return (
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 overflow-hidden shadow-sm">
            <div className="grid grid-cols-7 border-b border-black/5 dark:border-white/10 bg-gray-50/50 dark:bg-black/20">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 auto-rows-fr">
                {emptyDays.map(i => (
                    <div key={`empty-${i}`} className="min-h-[120px] bg-gray-50/20 dark:bg-white/[0.02] border-r border-b border-black/5 dark:border-white/5" />
                ))}

                {days.map(day => {
                    const dayEvents = getEventsForDay(day)
                    const isToday = day === today.getDate() && currentMonth === today.getMonth()

                    return (
                        <div key={day} className={cn(
                            "min-h-[120px] p-2 border-r border-b border-black/5 dark:border-white/5 transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.02]",
                            isToday ? "bg-[#257300]/5" : ""
                        )}>
                            <div className="flex justify-between items-start mb-2">
                                <span className={cn(
                                    "w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium",
                                    isToday
                                        ? "bg-[#257300] text-white"
                                        : "text-gray-700 dark:text-gray-300"
                                )}>
                                    {day}
                                </span>
                            </div>

                            <div className="space-y-1">
                                {dayEvents.map(event => (
                                    <Link
                                        key={event.id}
                                        href={`/events/${event.slug}`}
                                        className="block text-xs p-1.5 rounded bg-[#257300]/10 text-[#257300] dark:bg-[#B2CB20]/10 dark:text-[#B2CB20] hover:opacity-80 truncate transition-opacity"
                                    >
                                        {event.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
