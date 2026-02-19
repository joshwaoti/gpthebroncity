"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { mediaData } from "@/data"

gsap.registerPlugin(ScrollTrigger)

export function MediaHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out"
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
        <section ref={containerRef} className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${mediaData.hero.bgImage})` }}
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10 pt-20">
                <div className="max-w-3xl">
                    <div className="hero-content inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{mediaData.hero.badge}</span>
                    </div>

                    <h1 ref={titleRef} className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                        {mediaData.hero.title}
                    </h1>

                    <p className="hero-content text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
                        {mediaData.hero.description}
                    </p>

                    <div className="hero-content flex flex-wrap gap-4">
                        <Button size="lg" className="gap-2 text-lg px-8">
                            <Play className="w-5 h-5 fill-current" /> {mediaData.hero.cta}
                        </Button>
                        <Button size="lg" variant="secondary" className="text-lg px-8">
                            View All Series
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
