"use client"

import { Button } from "@/components/ui/button"
import { homeData } from "@/data"
import { Play, Headphones } from "lucide-react"

export function LatestSermon() {
    return (
        <section className="py-24 px-6 md:px-12 bg-accent dark:bg-[#050803] relative overflow-hidden transition-colors duration-300">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#257300]/5 dark:from-primary/10 to-transparent pointer-events-none" />
            {/* Subtle dot pattern in light mode */}
            <div className="absolute inset-0 section-pattern dark:opacity-0 pointer-events-none" />

            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
                {/* Thumbnail */}
                <div className="lg:w-1/2 relative group cursor-pointer w-full">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/80 border border-border dark:border-white/10 aspect-video">
                        <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${homeData.latestSermon.thumbnail})` }}
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#257300] group-hover:text-white group-hover:border-transparent text-white">
                                <Play className="w-8 h-8 fill-current ml-1" />
                            </div>
                        </div>
                    </div>
                    {/* Gold offset border */}
                    <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 rounded-2xl -z-10" />
                </div>

                {/* Content */}
                <div className="lg:w-1/2 text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-light dark:bg-[#257300]/20 text-gold dark:text-[#B2CB20] text-xs font-bold rounded-full uppercase tracking-wider mb-6 border border-gold/20 dark:border-transparent">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                        {homeData.latestSermon.badge}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-8">
                        {homeData.latestSermon.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-lg">
                        {homeData.latestSermon.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg">
                            {homeData.latestSermon.actions.watch}
                        </Button>
                        <Button variant="outline" size="lg">
                            <Headphones className="mr-2 w-4 h-4" /> {homeData.latestSermon.actions.listen}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
