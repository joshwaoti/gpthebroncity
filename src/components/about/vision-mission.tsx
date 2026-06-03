"use client"

import { aboutData } from "@/data"
import { Eye, Target } from "lucide-react"

const directionItems = [
    {
        key: "vision",
        icon: Eye,
        tone: "primary",
    },
    {
        key: "mission",
        icon: Target,
        tone: "gold",
    },
] as const

export function VisionMission() {
    return (
        <section className="border-b border-border bg-background py-16 md:py-20">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-10 max-w-2xl md:mb-12">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        Our Direction
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                        Vision & Mission
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        The heartbeat of Hebron City is clear: a spiritually growing church with a practical witness in everyday life.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                    {directionItems.map((item) => {
                        const content = aboutData[item.key]
                        const Icon = item.icon
                        const isGold = item.tone === "gold"

                        return (
                            <article
                                key={content.title}
                                className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md md:p-8"
                            >
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md border border-border bg-muted">
                                    <Icon className={isGold ? "h-6 w-6 text-gold" : "h-6 w-6 text-primary"} />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">{content.title}</h3>
                                <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
                                    {content.content}
                                </p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
