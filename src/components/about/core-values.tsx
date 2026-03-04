"use client"

import { aboutData } from "@/data"
import { BookOpen } from "lucide-react"

export function CoreValues() {
    return (
        <section className="py-24 bg-background border-b border-border">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="inline-block text-primary font-bold tracking-widest uppercase text-sm mb-4 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full">
                        What Drives Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                        Our Core Values
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        These values are the pillars upon which our ministry is built. They define how we live, serve, and grow together.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {aboutData.coreValues.map((value, i) => (
                        <div
                            key={i}
                            className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mt-6 -mr-6 group-hover:bg-primary/10 transition-colors duration-500" />
                            <div className="relative z-10">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <span className="text-primary font-bold text-lg">{i + 1}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-display font-bold text-foreground mb-1">{value.title}</h3>
                                <p className="text-xs text-primary/80 font-medium mb-3 italic">{value.scripture}</p>
                                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Core Functions */}
                <div className="text-center mb-12">
                    <span className="inline-block text-[#C8A229] font-bold tracking-widest uppercase text-sm mb-4 border border-[#C8A229]/20 bg-[#C8A229]/5 px-4 py-1.5 rounded-full">
                        How We Function
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                        Core Functions
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {aboutData.coreFunctions.map((fn, i) => (
                        <div
                            key={i}
                            className="flex gap-5 items-start bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <div className="shrink-0 w-10 h-10 bg-[#C8A229]/10 rounded-xl flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-[#C8A229]" />
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-foreground mb-2">{fn.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{fn.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
