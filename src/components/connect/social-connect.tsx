"use client"

import { Button } from "@/components/ui/button"
import { Youtube, Facebook, Instagram, Linkedin, ExternalLink } from "lucide-react"
import { connectPage } from "@/data"
import Link from "next/link"

export function SocialConnect() {
    const getIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "youtube": return <Youtube className="w-8 h-8" />
            case "facebook": return <Facebook className="w-8 h-8" />
            case "instagram": return <Instagram className="w-8 h-8" />
            case "tiktok": return <Linkedin className="w-8 h-8" /> // Using Linkedin icon as placeholder for TikTok if not available in this lucide version
            default: return <ExternalLink className="w-8 h-8" />
        }
    }

    const getColor = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "youtube": return "hover:bg-red-600 hover:text-white hover:border-red-600"
            case "facebook": return "hover:bg-blue-600 hover:text-white hover:border-blue-600"
            case "instagram": return "hover:bg-pink-600 hover:text-white hover:border-pink-600"
            case "tiktok": return "hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black"
            default: return "hover:bg-primary hover:text-white"
        }
    }

    return (
        <section className="py-20 bg-background border-b border-border">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-display font-bold text-foreground mb-4">Follow Us Online</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Stay updated with our latest sermons, events, and community stories.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {connectPage.socials.map((social, idx) => (
                        <Link
                            key={idx}
                            href={social.link}
                            target="_blank"
                            className={`group bg-card border border-border p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${getColor(social.platform)}`}
                        >
                            <div className="mb-4 text-muted-foreground group-hover:text-current transition-colors">
                                {getIcon(social.platform)}
                            </div>
                            <h3 className="text-xl font-bold font-display mb-1 text-foreground group-hover:text-current">{social.platform}</h3>
                            <p className="text-sm text-muted-foreground mb-6 group-hover:text-current/80">{social.handle}</p>
                            <span className="text-xs font-bold uppercase tracking-wider bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full group-hover:bg-white/20 group-hover:text-current transition-colors">
                                {social.followers} Followers
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
