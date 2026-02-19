"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HistoryHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.2,
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="relative h-[60vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('/assets/img/bg-subheader.jpg')` }}
                />
                <div className="absolute inset-0 bg-black/60 z-10" />
            </div>

            <div className="relative z-20 container mx-auto px-4 text-center">
                <div className="inline-block px-4 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6">
                    <span className="text-xs font-bold text-[#B2CB20] tracking-widest uppercase">Our Story</span>
                </div>
                <h1 ref={titleRef} className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                    Our Journey: <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        From City Center to Utawala
                    </span>
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                    Tracing the footsteps of faith. From a humble gathering on the 5th floor to a permanent sanctuary, witness the unfolding of a divine vision.
                </p>
            </div>
        </div>
    )
}
