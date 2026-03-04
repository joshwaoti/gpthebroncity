"use client"

import * as React from "react"
import { CalendarPlus, Calendar, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface AddToCalendarProps {
    event: {
        title: string
        description?: string
        location?: string
        date: string
        endDate?: string
        startTime?: string
        endTime?: string
    }
    variant?: "default" | "icon"
    className?: string
}

export function AddToCalendar({ event, variant = "default", className }: AddToCalendarProps) {
    const { title, description = "", location = "", date, endDate, startTime, endTime } = event

    const formatDateTime = (d: string, t?: string) => {
        if (!t) return d.slice(0, 10).replace(/-/g, "") + "T000000Z"
        return d.slice(0, 10).replace(/-/g, "") + "T" + t.replace(/:/g, "") + "00Z"
    }

    const start = formatDateTime(date, startTime)
    const end = endDate ? formatDateTime(endDate, endTime) : (startTime && endTime ? formatDateTime(date, endTime) : formatDateTime(date, startTime))

    const details = encodeURIComponent(description)
    const loc = encodeURIComponent(location)
    const summ = encodeURIComponent(title)

    // Google Calendar Link
    const googleLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${summ}&dates=${start}/${end}&details=${details}&location=${loc}`

    // Outlook Web Link
    const outlookLink = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${summ}&startdt=${date}${startTime ? "T" + startTime : ""}&enddt=${endDate || date}${endTime ? "T" + endTime : ""}&body=${details}&location=${loc}`

    // iCal Content
    const generateIcal = () => {
        const ical = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `DTSTART:${start}`,
            `DTEND:${end}`,
            `SUMMARY:${title}`,
            `DESCRIPTION:${description}`,
            `LOCATION:${location}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\n')

        const blob = new Blob([ical], { type: 'text/calendar;charset=utf-8' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleAction = (url?: string, isDownload?: boolean) => (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isDownload) {
            generateIcal()
        } else if (url) {
            window.open(url, '_blank')
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                {variant === "icon" ? (
                    <Button variant="ghost" size="icon" className={cn("h-8 w-8 rounded-full", className)} title="Add to Calendar">
                        <CalendarPlus className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button className={cn("w-full gap-2", className)} size="lg">
                        <CalendarPlus className="w-4 h-4" /> Add to Calendar
                    </Button>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <DropdownMenuItem onClick={handleAction(googleLink)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Google Calendar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAction(outlookLink)}>
                    <Mail className="w-4 h-4 mr-2" />
                    Outlook (Web)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAction(undefined, true)}>
                    <FileText className="w-4 h-4 mr-2" />
                    Download iCal (.ics)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
