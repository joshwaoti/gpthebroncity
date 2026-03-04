"use client"

import { peerGroupsPage } from "@/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function PeerGroupsCTA() {
    return (
        <section className="py-24 bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4 max-w-3xl text-center">
                <span className="inline-block text-primary font-bold tracking-widest uppercase text-sm mb-6 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full">
                    Get Connected
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                    {peerGroupsPage.cta.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                    {peerGroupsPage.cta.description}
                </p>
                <Link href="/connect">
                    <Button variant="cta" size="lg" className="gap-3">
                        {peerGroupsPage.cta.buttonText}
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </Link>
            </div>
        </section>
    )
}
