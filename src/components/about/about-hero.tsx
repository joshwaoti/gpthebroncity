"use client"

import { useRef, useEffect } from "react"
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
                y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2
            })
            gsap.from(".about-hero-content", {
                y: 30, opacity: 0, duration: 1, stagger: 0.1, delay: 0.4, ease: "power3.out"
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative h-[65vh] min-h-[520px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/assets/img/bg_full_1.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/65" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                <span className="about-hero-content inline-block text-primary font-bold tracking-widest uppercase text-sm mb-4 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full">
                    Who We Are
                </span>

                <h1 ref={titleRef} className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                    About GPT Hebron City
                </h1>

                <p className="about-hero-content text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8">
                    {aboutData.mission.content}
                </p>

                <div className="about-hero-content inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
                    <span className="text-[#B2CB20] font-semibold text-sm tracking-widest uppercase">&ldquo;{aboutData.slogan}&rdquo;</span>
                </div>
            </div>
        </section>
    )
}
