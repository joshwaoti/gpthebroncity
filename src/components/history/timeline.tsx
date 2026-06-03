"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { historyData } from "@/data"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".timeline-item") as HTMLElement[]

            items.forEach((item) => {
                gsap.from(item, {
                    y: 56,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 82%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                })
            })

            gsap.to(".timeline-line-progress", {
                height: "100%",
                scrollTrigger: {
                    trigger: ".timeline-container",
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                },
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative overflow-hidden bg-background py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-12 max-w-2xl">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        {historyData.timeline.badge}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                        {historyData.timeline.title}
                    </h2>
                    <p className="mt-4 text-muted-foreground">{historyData.timeline.description}</p>
                </div>
            </div>

            <div className="container timeline-container relative mx-auto max-w-6xl px-4">
                <div className="absolute bottom-0 left-7 top-0 w-px bg-border md:left-1/2 md:-translate-x-1/2">
                    <div className="timeline-line-progress h-0 w-full bg-primary" />
                </div>

                <div className="space-y-10 md:space-y-16">
                    {historyData.timeline.milestones.map((milestone, index) => (
                        <article
                            key={milestone.title}
                            className={cn(
                                "timeline-item relative flex flex-col gap-6 pl-14 md:flex-row md:pl-0",
                                index % 2 === 0 ? "md:flex-row-reverse" : ""
                            )}
                        >
                            <div className="absolute left-7 top-7 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow-sm md:left-1/2" />

                            <div className="md:w-1/2">
                                <div className={cn(index % 2 === 0 ? "md:pl-12" : "md:pr-12")}>
                                    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                                        <div className="relative aspect-video">
                                            <Image
                                                src={milestone.image}
                                                alt={milestone.title}
                                                fill
                                                sizes="(min-width: 768px) 42vw, 100vw"
                                                className="object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-5 md:p-6">
                                            <span className="text-xs font-bold uppercase tracking-widest text-primary">
                                                {milestone.year}
                                            </span>
                                            <h3 className="mt-2 text-2xl font-bold text-foreground">
                                                {milestone.title}
                                            </h3>
                                            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block md:w-1/2" />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
