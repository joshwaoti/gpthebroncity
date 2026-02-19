"use client"

import { Button } from "@/components/ui/button"
import { ministriesPage } from "@/data"
import Link from "next/link"
import { HeartHandshake } from "lucide-react"

export function MinistryCTA() {
    return (
        <section className="py-24 bg-primary text-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "radial-gradient(circle at 70% 50%, white 0%, transparent 50%)"
                }}
            />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                        {ministriesPage.cta.title}
                    </h2>
                    <p className="text-xl text-white/90 mb-10 leading-relaxed">
                        {ministriesPage.cta.description}
                    </p>
                    <Link href="/connect">
                        <Button size="lg" variant="secondary" className="text-primary bg-white hover:bg-gray-100 border-none px-8 py-6 text-lg gap-3 shadow-lg">
                            <HeartHandshake className="w-5 h-5" />
                            {ministriesPage.cta.buttonText}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
