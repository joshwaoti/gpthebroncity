"use client"

import { aboutData } from "@/data"
import { BookOpen, Sparkles } from "lucide-react"

export function CoreValues() {
    return (
        <section className="border-b border-border bg-muted/30 py-16 md:py-20">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-10 max-w-2xl md:mb-12">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        What Drives Us
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                        Our Core Values
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        These values define how we live, serve, and grow together as a church family.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {aboutData.coreValues.map((value, index) => (
                        <article
                            key={value.title}
                            className="rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                        >
                            <div className="mb-5 flex items-center justify-between gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-sm font-bold text-primary">
                                    {index + 1}
                                </span>
                                <Sparkles className="h-4 w-4 text-gold" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                            <p className="mt-1 text-xs font-semibold italic text-primary/80">{value.scripture}</p>
                            <p className="mt-3 text-sm leading-7 text-muted-foreground">{value.description}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
                    <div>
                        <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
                            How We Function
                        </span>
                        <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                            Core Functions
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            These rhythms help the church remain prayerful, biblical, accountable, and relational.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {aboutData.coreFunctions.map((fn) => (
                            <article
                                key={fn.title}
                                className="rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:border-gold/40 hover:shadow-md"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/10 text-gold">
                                        <BookOpen className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h3 className="font-bold text-foreground">{fn.title}</h3>
                                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{fn.description}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
