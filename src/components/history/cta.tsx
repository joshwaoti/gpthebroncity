"use client"

import Link from "next/link"
import { ArrowRight, HeartHandshake } from "lucide-react"
import { historyData } from "@/data"
import { Button } from "@/components/ui/button"

export function HistoryCTA() {
    return (
        <section className="border-y border-border bg-muted/30 py-16 text-center md:py-20">
            <div className="container relative z-10 mx-auto max-w-4xl px-4">
                <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                    Next Step
                </span>
                <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                    {historyData.cta.title}
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                    {historyData.cta.description}
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href="/visit">
                        <Button size="lg" className="w-full gap-2 sm:w-auto">
                            {historyData.cta.primaryAction}
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/connect">
                        <Button variant="secondary" size="lg" className="w-full gap-2 sm:w-auto">
                            <HeartHandshake className="h-5 w-5" />
                            {historyData.cta.secondaryAction}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
