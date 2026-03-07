"use client"

import { Button } from "@/components/ui/button"
import { HeartHandshake, Copy, Check } from "lucide-react"
import { projectsPage } from "@/data"
import Link from "next/link"
import { useState } from "react"

export function PartnerCTA() {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${projectsPage.giving.paybill}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

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

                {/* Giving Details */}
                <div className="max-w-md mx-auto mb-10">
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                        <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider font-semibold">Give via M-Pesa</p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between gap-4 bg-white dark:bg-white/10 rounded-xl p-4">
                                <div className="text-left">
                                    <p className="text-xs text-muted-foreground uppercase">Paybill</p>
                                    <p className="text-2xl font-bold text-foreground">{projectsPage.giving.paybill}</p>
                                </div>
                                <button 
                                    onClick={copyToClipboard}
                                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                                    title="Copy Paybill"
                                >
                                    {copied ? (
                                        <Check className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between gap-4 bg-white dark:bg-white/10 rounded-xl p-4">
                                <div className="text-left">
                                    <p className="text-xs text-muted-foreground uppercase">Account Number</p>
                                    <p className="text-2xl font-bold text-foreground">{projectsPage.giving.accountNumber}</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground mt-4 italic">
                            {projectsPage.giving.cta}
                        </p>
                    </div>
                </div>

                <Link href="/give">
                    <Button size="lg" className="text-lg px-10 py-6 h-auto shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-300">
                        {projectsPage.cta.buttonText}
                    </Button>
                </Link>
            </div>
        </section>
    )
}
