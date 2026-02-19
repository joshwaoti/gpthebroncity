"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { homeData } from "@/data"
import { useCountdown } from "@/hooks/use-countdown"
import { ArrowRight, Bell } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const timeLeft = useCountdown(homeData.serviceTimes.nextService)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background Parallax
            gsap.to(".hero-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            })

            // Title Reveal
            gsap.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.2,
            })

            // Stagger other elements
            gsap.from(".hero-element", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.8,
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="hero-bg w-full h-[120%] bg-cover bg-center"
                    style={{ backgroundImage: `url(${homeData.hero.bgImage})` }}
                />
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center mt-0 md:mt-20 flex flex-col items-center justify-center h-full">
                <div className="hero-element inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#B2CB20]/30 bg-[#B2CB20]/10 backdrop-blur-sm mb-6 md:mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B2CB20] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B2CB20]"></span>
                    </span>
                    <span className="text-xs font-bold text-[#B2CB20] tracking-widest uppercase">{homeData.hero.badge}</span>
                </div>

                <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-6 md:mb-8 tracking-tighter leading-[1.1] pb-2">
                    {homeData.hero.title.line1} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 italic pr-2">
                        {homeData.hero.title.line2}
                    </span>
                </h1>

                <p className="hero-element text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 md:mb-12 font-light leading-relaxed px-4">
                    {homeData.hero.description}
                </p>

                <div className="hero-element flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full px-4">
                    <Button variant="default" size="xl" className="group text-lg w-full sm:w-auto">
                        {homeData.hero.cta.primary}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="secondary" size="xl" className="text-lg w-full sm:w-auto">
                        {homeData.hero.cta.secondary}
                    </Button>
                </div>

                {/* Mobile Next Service Card */}
                <div className="hero-element mt-8 md:hidden w-full max-w-sm mx-auto">
                    <GlassCard variant="default" className="p-4 flex items-center justify-between bg-black/40 backdrop-blur-md border-white/10">
                        <div className="text-left">
                            <span className="text-[10px] font-bold text-[#B2CB20] uppercase tracking-widest block mb-1">Next Service</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold font-display text-white">{timeLeft.days}</span>
                                <span className="text-xs text-gray-400">Days</span>
                                <span className="text-xl font-bold font-display text-white ml-2">{timeLeft.hours}</span>
                                <span className="text-xs text-gray-400">Hrs</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-white hover:text-[#B2CB20]">
                            <Bell className="w-5 h-5" />
                        </Button>
                    </GlassCard>
                </div>
            </div>

            {/* Desktop Countdown Timer */}
            <div className="hero-element absolute bottom-10 right-10 z-30 hidden md:block">
                <GlassCard variant="default" className="p-6 min-w-[300px]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{homeData.serviceTimes.label}</span>
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <div className="flex justify-between text-center gap-2 mb-4">
                        <TimeUnit value={timeLeft.days} label="Days" />
                        <Separator />
                        <TimeUnit value={timeLeft.hours} label="Hrs" />
                        <Separator />
                        <TimeUnit value={timeLeft.minutes} label="Min" />
                        <Separator />
                        <TimeUnit value={timeLeft.seconds} label="Sec" color="text-[#B2CB20]" />
                    </div>
                    <Button variant="ghost" size="sm" className="w-full text-xs text-[#B2CB20] hover:text-white">
                        <Bell className="w-3 h-3 mr-2" /> Notify Me
                    </Button>
                </GlassCard>
            </div>

            {/* Scroll Indicator */}
            <div className="hero-element absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Scroll</span>
                <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white rounded-full animate-scroll" />
                </div>
            </div>
        </div>
    )
}

function TimeUnit({ value, label, color = "text-white" }: { value: number; label: string; color?: string }) {
    return (
        <div>
            <span className={`block text-3xl font-bold font-display ${color}`}>{value.toString().padStart(2, '0')}</span>
            <span className="text-[10px] text-gray-500 uppercase font-bold">{label}</span>
        </div>
    )
}

function Separator() {
    return <span className="text-2xl text-gray-600 font-light">:</span>
}
