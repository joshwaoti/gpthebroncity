"use client"

import { aboutData } from "@/data"
import { CheckCircle2 } from "lucide-react"

export function OurIdentity() {
    return (
        <section className="border-b border-border bg-muted/30 py-16 md:py-20">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div className="lg:sticky lg:top-28">
                        <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                            {aboutData.identity.intro}
                        </span>
                        <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                            {aboutData.identity.title}
                        </h2>
                        <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
                            {aboutData.identity.statement}
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {aboutData.identity.points.map((point) => (
                            <article
                                key={point}
                                className="rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                            >
                                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <p className="text-sm leading-7 text-foreground/80 md:text-base">
                                    {point}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
