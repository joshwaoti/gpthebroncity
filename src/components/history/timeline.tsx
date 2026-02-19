"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const milestones = [
    {
        year: "The Beginning",
        title: "Bidco Towers - 5th Floor",
        description: "It started with faith, 40 individuals, and a vision concerning the 5th floor. In a small rented hall, the seeds of a great movement were sown. The atmosphere was charged with expectation, and though the numbers were few, the spirit was mighty.",
        image: "/assets/img/citycenter.jpg"
    },
    {
        year: "Expansion",
        title: "Moi Avenue Primary",
        description: "As the family grew, the walls of Bidco could no longer contain the praise. We moved to Moi Avenue Primary, a season of explosion in numbers and spirit. We learned to setup and teardown, a mobile tabernacle for a mobile God.",
        image: "/assets/img/citycenter.jpg"
    },
    {
        year: "Present Day",
        title: "The Utawala Vision",
        description: "The wandering ceased as we stepped into our promised land. GPT Hebron City in Utawala became not just a building, but a beacon of hope for the community. A permanent sanctuary where generations will encounter God.",
        image: "/assets/img/citycenter.jpg"
    }
]

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray('.timeline-item') as HTMLElement[]

            items.forEach((item) => {
                gsap.from(item, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                })
            })

            // Line progress
            gsap.to('.timeline-line-progress', {
                height: '100%',
                scrollTrigger: {
                    trigger: '.timeline-container',
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1
                }
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="container mx-auto px-4 timeline-container relative">
                {/* Vertical Line */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
                    <div className="timeline-line-progress w-full bg-primary h-0"></div>
                </div>

                <div className="space-y-24">
                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className={cn(
                                "timeline-item flex flex-col md:flex-row gap-8 relative",
                                index % 2 === 0 ? "md:flex-row-reverse" : ""
                            )}
                        >
                            {/* Dot */}
                            <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary -translate-x-1/2 mt-8 z-10 shadow-[0_0_10px_rgba(37,115,0,0.5)]"></div>

                            {/* Content */}
                            <div className="flex-1 ml-12 md:ml-0 md:w-1/2">
                                <div className={cn(
                                    "bg-card border border-border p-8 rounded-2xl hover:border-primary/30 transition-colors duration-500 shadow-sm",
                                    index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                                )}>
                                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">{milestone.year}</span>
                                    <h3 className="text-2xl font-display font-bold text-foreground mb-4">{milestone.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6">{milestone.description}</p>
                                    <div className="aspect-video rounded-lg overflow-hidden relative group">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                        <img
                                            src={milestone.image}
                                            alt={milestone.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Empty space for alternating layout */}
                            <div className="hidden md:block flex-1"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
