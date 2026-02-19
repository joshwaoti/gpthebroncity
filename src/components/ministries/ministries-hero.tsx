"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ministriesPage } from "@/data"

gsap.registerPlugin(ScrollTrigger)

export function MinistriesHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.2
            })

            gsap.from(".hero-content", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                delay: 0.4,
                ease: "power3.out"
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${ministriesPage.hero.bgImage})` }}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/30" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <span className="hero-content inline-block text-primary font-bold tracking-widest uppercase text-sm mb-4 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full">
                    {ministriesPage.hero.subtitle}
                </span>

                <h1 ref={titleRef} className="text-5xl md:text-7xl font-display font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
                    {ministriesPage.hero.title}
                </h1>

                <p className="hero-content text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                    {ministriesPage.hero.description}
                </p>
            </div>
        </section>
    )
}
