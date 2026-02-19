"use client"

import Link from "next/link"
import { ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Our History", href: "/about/history" },
    { label: "Beliefs", href: "/about/beliefs" },
    { label: "Media", href: "/media" },
    { label: "Projects", href: "/projects" },
]

const connectLinks = [
    { label: "Events", href: "/events" },
    { label: "Ministries", href: "/ministries" },
    { label: "Visit Us", href: "/visit" },
    { label: "Give", href: "/give" },
    { label: "Connect", href: "/connect" },
]

const socialLinks = [
    { icon: "F", url: "#", label: "Facebook" },
    { icon: "I", url: "#", label: "Instagram" },
    { icon: "Y", url: "#", label: "YouTube" },
    { icon: "X", url: "#", label: "X (Twitter)" },
]

export function Footer() {
    return (
        <footer className="bg-[#0f1f08] text-white relative overflow-hidden">
            {/* Gold divider at top */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C8A229] to-transparent" />

            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#257300]/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
                {/* Main footer grid — 2 columns on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-8 mb-12">

                    {/* Column 1: Brand + Socials */}
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-6 sm:gap-10 lg:gap-6">
                            {/* Logo + Tagline side */}
                            <div className="flex-1">
                                <div className="h-10 mb-4 relative w-[140px]">
                                    <Image
                                        src="/assets/img/logo/logo-2.png"
                                        alt="GPT Hebron City Logo"
                                        width={140}
                                        height={40}
                                        className="block"
                                    />
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-4">
                                    Christ Revealed, Christ Expressed. Building a community of faith for the next generation.
                                </p>
                                {/* Social links */}
                                <div className="flex gap-2">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.url}
                                            aria-label={social.label}
                                            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#C8A229]/20 border border-white/10 hover:border-[#C8A229]/40 flex items-center justify-center text-white/50 hover:text-[#C8A229] transition-all duration-300"
                                        >
                                            <span className="text-xs font-bold">{social.icon}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Stay Updated — same row as brand on mobile */}
                            <div className="flex-1 sm:max-w-[280px] lg:hidden">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8A229] mb-4">Stay Updated</h4>
                                <p className="text-sm text-white/50 mb-3">Get weekly sermon notes and church updates.</p>
                                <div className="flex gap-2 mb-4">
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C8A229]/50 transition-all"
                                    />
                                    <Button size="sm" className="bg-[#C8A229] hover:bg-[#d4af37] text-[#0a0f05] rounded-lg px-3">
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="space-y-2 text-xs text-white/50">
                                    <a href="mailto:info@gpthebroncity.org" className="flex items-center gap-2 hover:text-white transition-colors">
                                        ✉ info@gpthebroncity.org
                                    </a>
                                    <div className="flex items-center gap-2">
                                        📍 Utawala, Nairobi
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8A229] mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#C8A229]" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Connect */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8A229] mb-4">Connect</h4>
                        <ul className="space-y-2.5">
                            {connectLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#C8A229]" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Stay Updated — desktop only (mobile shown above with brand) */}
                    <div className="hidden lg:block">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#C8A229] mb-4">Stay Updated</h4>
                        <p className="text-sm text-white/50 mb-4">Get weekly sermon notes and church updates.</p>
                        <div className="flex gap-2 mb-6">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C8A229]/50 focus:ring-1 focus:ring-[#C8A229]/20 transition-all"
                            />
                            <Button size="sm" className="bg-[#C8A229] hover:bg-[#d4af37] text-[#0a0f05] rounded-lg px-4">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="space-y-3 text-sm text-white/50">
                            <a href="mailto:info@gpthebroncity.org" className="flex items-center gap-2 hover:text-white transition-colors">
                                ✉ info@gpthebroncity.org
                            </a>
                            <div className="flex items-center gap-2">
                                📍 Utawala, Nairobi
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} GPT Hebron City. All rights reserved.
                    </p>
                    <p className="text-xs text-white/30 flex items-center gap-1">
                        Made with <Heart className="w-3 h-3 text-[#C8A229] fill-current" /> by Zitrion
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
