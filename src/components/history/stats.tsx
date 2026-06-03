"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { historyData } from "@/data"

gsap.registerPlugin(ScrollTrigger)

export function Stats() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".stat-item", {
                y: 32,
                opacity: 0,
                duration: 0.7,
                stagger: 0.08,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="border-b border-border bg-muted/30 py-14 md:py-16">
            <div className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
                <div>
                    <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
                        Testimony
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                        {historyData.statsIntro.title}
                    </h2>
                    <p className="mt-4 text-muted-foreground">{historyData.statsIntro.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {historyData.stats.map((stat) => (
                        <div key={stat.label} className="stat-item rounded-lg border border-border bg-card p-5 text-center shadow-sm">
                            <div className="text-3xl font-bold text-primary md:text-4xl">
                                {stat.value}{stat.suffix}
                            </div>
                            <div className="mt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
