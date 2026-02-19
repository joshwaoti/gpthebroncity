"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { value: 500, label: "Weekly Attendance", suffix: "+" },
    { value: 12, label: "Community Ministries", suffix: "+" },
    { value: 150, label: "Youth Mentored", suffix: "+" },
    { value: 1000, label: "Sanctuary Seats", suffix: "+" },
]

export function Stats() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".stat-item", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            })

            // Counter animation could be added here
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="py-20 bg-[#B2CB20] text-[#0a0f05]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                    <div className="max-w-xs">
                        <h2 className="text-3xl font-display font-bold mb-4">Impact by the Numbers</h2>
                        <p className="text-[#0a0f05]/80 font-medium">Our growth is a testimony to the grace of God and the dedication of our community.</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item text-center">
                                <div className="text-4xl md:text-5xl font-display font-bold mb-2">
                                    {stat.value}{stat.suffix}
                                </div>
                                <div className="text-sm font-bold uppercase tracking-wider opacity-80">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
