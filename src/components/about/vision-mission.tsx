"use client"

import { aboutData } from "@/data"
import { Eye, Target } from "lucide-react"

export function VisionMission() {
    return (
        <section className="py-24 bg-background border-b border-border">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="inline-block text-primary font-bold tracking-widest uppercase text-sm mb-4 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full">
                        Our Direction
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                        Vision & Mission
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Vision */}
                    <div className="group relative bg-card border border-border rounded-3xl p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mt-10 -mr-10 group-hover:bg-primary/10 transition-colors duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                                <Eye className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                                {aboutData.vision.title}
                            </h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {aboutData.vision.content}
                            </p>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="group relative bg-card border border-border rounded-3xl p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#C8A229]/5 rounded-full blur-3xl -mt-10 -mr-10 group-hover:bg-[#C8A229]/10 transition-colors duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-[#C8A229]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#C8A229]/20 transition-colors duration-300">
                                <Target className="w-7 h-7 text-[#C8A229]" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                                {aboutData.mission.title}
                            </h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {aboutData.mission.content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
