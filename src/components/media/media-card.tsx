"use client"

import { Play, Clock, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface MediaItem {
    id: number
    title: string
    preacher: string
    series: string
    date: string
    thumbnail: string
    category: string
    duration: string
}

interface MediaCardProps {
    item: MediaItem
}

export function MediaCard({ item }: MediaCardProps) {
    return (
        <div className="group relative flex flex-col gap-4">
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    <div className="w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm">
                        <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-medium text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.duration}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span className="uppercase tracking-wider font-bold text-primary">{item.series}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.preacher}</p>
            </div>
        </div>
    )
}
