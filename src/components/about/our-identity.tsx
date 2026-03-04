"use client"

import { aboutData } from "@/data"
import { CheckCircle2 } from "lucide-react"

export function OurIdentity() {
    return (
        <section className="py-24 bg-muted/30 border-b border-border">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <div>
                        <span className="inline-block text-primary font-bold tracking-widest uppercase text-sm mb-4 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full">
                            {aboutData.identity.intro}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-4 mb-6">
                            {aboutData.identity.title}
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Green Pastures Tabernacle – Hebron City is a vibrant, Christ-centred community committed to raising
                            Kingdom Ambassadors who impact their world for God.
                        </p>
                    </div>

                    {/* Right: Identity Points */}
                    <div className="space-y-5">
                        {aboutData.identity.points.map((point, i) => (
                            <div key={i} className="flex gap-4 items-start group bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-foreground leading-relaxed">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
