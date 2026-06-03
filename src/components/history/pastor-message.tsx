"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { historyData } from "@/data"

gsap.registerPlugin(ScrollTrigger)

export function PastorMessage() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".pastor-content", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="border-b border-border bg-background py-16 md:py-24">
            <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="pastor-content overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                    <div className="relative aspect-[4/3] min-h-[320px]">
                        <Image
                            src={historyData.pastorMessage.image}
                            alt={historyData.pastorMessage.imageAlt}
                            fill
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className="object-cover"
                            style={{ objectPosition: "center 18%" }}
                        />
                    </div>
                </div>

                <div className="pastor-content">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        {historyData.pastorMessage.badge}
                    </span>
                    <div className="mt-4 flex items-start gap-4">
                        <Quote className="mt-2 h-9 w-9 shrink-0 text-gold" />
                        <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                            {historyData.pastorMessage.title}
                        </h2>
                    </div>

                    <div className="mt-7 space-y-5">
                        {historyData.pastorMessage.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="text-base leading-8 text-muted-foreground md:text-lg">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="mt-8 rounded-lg border border-gold/30 bg-gold/10 p-5">
                        <p className="font-display text-xl font-bold text-foreground">
                            {historyData.pastorMessage.highlightedText}
                        </p>
                        <p className="mt-3 font-handwriting text-3xl font-bold text-primary">
                            {historyData.pastorMessage.signature}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
