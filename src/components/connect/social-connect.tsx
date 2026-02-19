"use client"

import { Button } from "@/components/ui/button"
import { Youtube, Facebook, Instagram, ExternalLink, ArrowUpRight } from "lucide-react"
import { connectPage } from "@/data"
import Link from "next/link"

export function SocialConnect() {
    const getIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "youtube": return <Youtube className="w-6 h-6" />
            case "facebook": return <Facebook className="w-6 h-6" />
            case "instagram": return <Instagram className="w-6 h-6" />
            case "tiktok": return (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.64 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.36-6.36V9.24a8.16 8.16 0 0 0 4.86 1.58V7.36a4.85 4.85 0 0 1-1-.67Z" />
                </svg>
            )
            default: return <ExternalLink className="w-6 h-6" />
        }
    }

    const getGradient = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "youtube": return "from-red-600 to-red-700"
            case "facebook": return "from-blue-600 to-blue-700"
            case "instagram": return "from-purple-600 via-pink-500 to-orange-400"
            case "tiktok": return "from-gray-900 to-black dark:from-white dark:to-gray-200"
            default: return "from-[#257300] to-[#1a5200]"
        }
    }

    const getAccent = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "youtube": return "bg-red-500/10 text-red-500 border-red-500/20"
            case "facebook": return "bg-blue-500/10 text-blue-500 border-blue-500/20"
            case "instagram": return "bg-pink-500/10 text-pink-500 border-pink-500/20"
            case "tiktok": return "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20"
            default: return "bg-[#257300]/10 text-[#257300] border-[#257300]/20"
        }
    }

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="w-8 h-[2px] bg-gold" />
                        <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">
                            Community
                        </span>
                        <div className="w-8 h-[2px] bg-gold" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Follow Us Online</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Stay connected with sermons, events, and community stories.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                    {connectPage.socials.map((social, idx) => (
                        <Link
                            key={idx}
                            href={social.link}
                            target="_blank"
                            className="group relative overflow-hidden rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                        >
                            {/* Gradient header */}
                            <div className={`h-24 bg-gradient-to-br ${getGradient(social.platform)} flex items-center justify-center relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="text-white opacity-90 group-hover:scale-110 transition-transform duration-300">
                                    {getIcon(social.platform)}
                                </div>
                                <ArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-display text-lg font-bold text-foreground mb-0.5">
                                    {social.platform}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3">{social.handle}</p>
                                <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full border ${getAccent(social.platform)}`}>
                                    {social.followers} Followers
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
