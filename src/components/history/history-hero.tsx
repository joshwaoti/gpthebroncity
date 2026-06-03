"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { historyData } from "@/data"

gsap.registerPlugin(ScrollTrigger)

export function HistoryHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.15,
            })
            gsap.from(".history-hero-content", {
                y: 24,
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                delay: 0.35,
                ease: "power3.out",
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative flex min-h-[560px] items-end overflow-hidden py-20 md:min-h-[680px] md:py-24">
            <div className="absolute inset-0 z-0">
                <Image
                    src={historyData.hero.bgImage}
                    alt={historyData.hero.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: historyData.hero.imagePosition }}
                    priority
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/35 to-black/10" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="max-w-3xl">
                    <span className="history-hero-content inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold backdrop-blur-sm">
                        {historyData.hero.badge}
                    </span>
                    <h1 ref={titleRef} className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
                        {historyData.hero.title}
                    </h1>
                    <p className="history-hero-content mt-6 max-w-2xl text-base leading-8 text-gray-100 sm:text-lg">
                        {historyData.hero.description}
                    </p>
                    <div className="history-hero-content mt-8 flex flex-wrap gap-3">
                        {historyData.hero.highlights.map((item) => (
                            <div key={item.label} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
                                <span className="mr-2 text-xs font-bold uppercase tracking-widest text-gold">{item.label}</span>
                                <span className="text-sm font-semibold text-white">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
