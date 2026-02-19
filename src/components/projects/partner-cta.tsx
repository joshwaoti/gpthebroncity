"use client"

import { Button } from "@/components/ui/button"
import { HeartHandshake } from "lucide-react"
import { projectsPage } from "@/data"

export function PartnerCTA() {
    return (
        <section className="py-24 bg-card border-t border-border relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary rounded-full blur-[100px]" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
                    <HeartHandshake className="w-8 h-8 text-primary" />
                </div>

                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                    {projectsPage.cta.title}
                </h2>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                    {projectsPage.cta.description}
                </p>

                <Button size="lg" className="text-lg px-10 py-6 h-auto shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-300">
                    {projectsPage.cta.buttonText}
                </Button>
            </div>
        </section>
    )
}
