"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function BeliefsHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.2
            })

            gsap.from(".belief-subtitle", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.5
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative py-32 md:py-48 flex items-center justify-center overflow-hidden bg-background">
            {/* Abstract Background */}
            <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <span className="belief-subtitle inline-block text-primary font-bold tracking-widest uppercase text-sm mb-6 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full">
                    Statement of Faith
                </span>
                <h1 ref={titleRef} className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight">
                    Our Confession <span className="text-muted-foreground italic font-serif">of Faith</span>
                </h1>
                <p className="belief-subtitle text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    The doctrinal pillars that uphold our community and guide our walk with Christ.
                </p>
            </div>
        </section>
    )
}
