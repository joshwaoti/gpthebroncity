"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { aboutData } from "@/data"

gsap.registerPlugin(ScrollTrigger)

export function AboutHero() {
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
            gsap.from(".about-hero-content", {
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
        <section
            ref={containerRef}
            className="relative flex min-h-[560px] items-center overflow-hidden py-28 md:min-h-[640px]"
        >
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${aboutData.hero.bgImage}')` }}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/35 to-black/20" />
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="max-w-3xl">
                    <span className="about-hero-content inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold backdrop-blur-sm">
                        {aboutData.hero.badge}
                    </span>

                    <h1 ref={titleRef} className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
                        {aboutData.hero.title}
                    </h1>

                    <p className="about-hero-content mt-6 max-w-2xl text-base leading-8 text-gray-100 sm:text-lg">
                        {aboutData.mission.content}
                    </p>

                    <div className="about-hero-content mt-8 inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gold sm:text-sm">
                            &ldquo;{aboutData.slogan}&rdquo;
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
