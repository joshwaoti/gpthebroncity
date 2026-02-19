"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HistoryCTA() {
    return (
        <section className="py-24 bg-background relative overflow-hidden text-center transition-colors duration-300">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#257300] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Be Part of the Next Chapter</h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                    The journey continues, and there is a place for you here. Join us this Sunday and experience the Hebron City difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/visit">
                        <Button size="xl" className="text-lg px-8">
                            Plan Your Visit <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/connect">
                        <Button variant="secondary" size="xl" className="text-lg px-8">
                            Join a Ministry
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
