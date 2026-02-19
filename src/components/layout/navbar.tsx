"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, MapPin, HeartHandshake, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/ui/brand-logo"
import { ThemeToggle } from "@/components/theme-toggle"
// @ts-ignore
import { useLenis } from "@studio-freight/react-lenis"
import gsap from "gsap"



export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const pathname = usePathname()
    const menuRef = React.useRef<HTMLDivElement>(null)
    const linksRef = React.useRef<HTMLDivElement>(null)
    const { resolvedTheme } = useTheme()

    React.useEffect(() => { setMounted(true) }, [])

    useLenis(({ scroll }: { scroll: number }) => {
        setIsScrolled(scroll > 50)
    })

    // True when the page background is light (light theme) AND we are NOT scrolled.
    // EXCEPTION: Home page is always dark, so we treat it as dark bg even in light mode when unscrolled.
    const isHomePage = pathname === "/"
    const isLightBg = mounted && resolvedTheme === "light" && !isScrolled && !isHomePage

    // When scrolled, the pill bg adapts via dark: classes; at rest we drive it manually.
    const linkColor = isLightBg ? "text-gray-900 hover:text-[#B2CB20]" : "text-white/90 hover:text-[#B2CB20]"
    const iconColor = isLightBg ? "text-gray-900" : "text-white"
    const logoVariant = isLightBg ? "default" : "white"

    // Helper for consistency
    const getLinkClasses = (isActive: boolean) => cn(
        "text-sm font-medium transition-colors",
        isActive
            ? "text-[#257300] dark:text-[#B2CB20]"
            : isScrolled
                ? "text-gray-800 dark:text-white/80 hover:text-[#257300] dark:hover:text-[#B2CB20]"
                : linkColor
    )

    // GSAP Animation for Mobile Menu
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
            gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: "power3.out" })
            gsap.fromTo(
                ".mobile-link",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
            )
        } else {
            document.body.style.overflow = "unset"
            gsap.to(menuRef.current, { x: "100%", duration: 0.5, ease: "power3.in" })
        }
    }, [isOpen])

    // Close menu on route change
    React.useEffect(() => { setIsOpen(false) }, [pathname])

    return (
        <>
            <header
                className={cn(
                    "fixed z-50",
                    isScrolled
                        ? "top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl bg-white/80 dark:bg-black/50 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl py-3 shadow-2xl"
                        : "top-0 left-0 right-0 w-full bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="relative z-50 block">
                        <BrandLogo
                            className={cn(isScrolled ? "h-8" : "h-10", "w-auto")}
                            variant={
                                isScrolled
                                    ? (mounted && resolvedTheme === "dark" ? "white" : "default")
                                    : logoVariant
                            }
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link href="/" className={getLinkClasses(pathname === "/")}>
                            Home
                        </Link>

                        {/* About Us Dropdown */}
                        <div className="relative group">
                            <button
                                className={cn(
                                    "flex items-center gap-1 outline-none",
                                    getLinkClasses(pathname.startsWith("/about"))
                                )}
                            >
                                About Us
                                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                            </button>
                            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="w-48 bg-white dark:bg-[#0a0f05] border border-black/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden p-2 flex flex-col gap-1">
                                    <Link
                                        href="/about/history"
                                        className={cn(
                                            "block px-4 py-2 rounded-lg text-sm transition-colors",
                                            pathname === "/about/history"
                                                ? "bg-[#257300]/10 text-[#257300] dark:text-[#B2CB20]"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#257300] dark:hover:text-[#B2CB20]"
                                        )}
                                    >
                                        Our Journey
                                    </Link>
                                    <Link
                                        href="/about/beliefs"
                                        className={cn(
                                            "block px-4 py-2 rounded-lg text-sm transition-colors",
                                            pathname === "/about/beliefs"
                                                ? "bg-[#257300]/10 text-[#257300] dark:text-[#B2CB20]"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#257300] dark:hover:text-[#B2CB20]"
                                        )}
                                    >
                                        Beliefs
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/events" className={getLinkClasses(pathname === "/events")}>
                            Events
                        </Link>
                        <Link href="/read" className={getLinkClasses(pathname === "/read")}>
                            Blog
                        </Link>
                        <Link href="/media" className={getLinkClasses(pathname === "/media")}>
                            Media
                        </Link>
                        <Link href="/projects" className={getLinkClasses(pathname === "/projects")}>
                            Projects
                        </Link>
                        <Link href="/give" className={getLinkClasses(pathname === "/give")}>
                            Give
                        </Link>

                        <div className="flex items-center gap-2">
                            <ThemeToggle className={isScrolled ? "" : iconColor} />
                            <Link href="/connect">
                                <Button variant="cta" size="sm" className="gap-2">
                                    <HeartHandshake className="w-4 h-4" /> Connect
                                </Button>
                            </Link>
                        </div>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden flex items-center gap-4">
                        <ThemeToggle className={isScrolled ? "" : iconColor} />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={cn(
                                "relative z-50 p-2 rounded-full transition-colors",
                                isScrolled
                                    ? "text-gray-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                                    : cn(iconColor, "hover:bg-black/5")
                            )}
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                ref={menuRef}
                className="fixed inset-0 z-40 bg-white dark:bg-[#0a0f05] translate-x-full flex flex-col pt-32 px-6"
            >
                <div className="flex flex-col gap-6" ref={linksRef}>
                    <Link
                        href="/"
                        className="mobile-link text-3xl font-display font-medium text-gray-900 dark:text-white hover:text-[#257300] dark:hover:text-[#B2CB20] transition-colors"
                    >
                        Home
                    </Link>

                    {/* Mobile About Section */}
                    <div className="mobile-link flex flex-col gap-4">
                        <span className="text-sm font-bold text-[#257300] dark:text-[#B2CB20] uppercase tracking-widest">About Us</span>
                        <Link
                            href="/about/history"
                            className="text-2xl font-display font-medium text-gray-700 dark:text-white/90 hover:text-[#257300] dark:hover:text-[#B2CB20] transition-colors pl-4 border-l-2 border-gray-200 dark:border-white/10 hover:border-[#257300] dark:hover:border-[#B2CB20]"
                        >
                            Our Journey
                        </Link>
                        <Link
                            href="/about/beliefs"
                            className="text-2xl font-display font-medium text-gray-700 dark:text-white/90 hover:text-[#257300] dark:hover:text-[#B2CB20] transition-colors pl-4 border-l-2 border-gray-200 dark:border-white/10 hover:border-[#257300] dark:hover:border-[#B2CB20]"
                        >
                            Beliefs
                        </Link>
                    </div>

                    <Link
                        href="/events"
                        className="mobile-link text-3xl font-display font-medium text-gray-900 dark:text-white hover:text-[#257300] dark:hover:text-[#B2CB20] transition-colors"
                    >
                        Events
                    </Link>
                    <Link
                        href="/read"
                        className="mobile-link text-3xl font-display font-medium text-gray-900 dark:text-white hover:text-[#257300] dark:hover:text-[#B2CB20] transition-colors"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/media"
                        className="mobile-link text-3xl font-display font-medium text-gray-900 dark:text-white hover:text-[#257300] dark:hover:text-[#B2CB20] transition-colors"
                    >
                        Media
                    </Link>
                    <Link
                        href="/projects"
                        className="mobile-link text-3xl font-display font-medium text-gray-900 dark:text-white hover:text-[#257300] dark:hover:text-[#B2CB20] transition-colors"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/give"
                        className="mobile-link text-3xl font-display font-medium text-gray-900 dark:text-white hover:text-[#257300] dark:hover:text-[#B2CB20] transition-colors"
                    >
                        Give
                    </Link>

                    <div className="mobile-link flex flex-col gap-4 mt-8">
                        <Link href="/visit">
                            <Button variant="secondary" size="lg" className="w-full justify-start gap-4">
                                <MapPin /> Plan a Visit
                            </Button>
                        </Link>
                        <Link href="/connect">
                            <Button variant="cta" size="lg" className="w-full justify-start gap-4">
                                <HeartHandshake /> Connect With Us
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#257300] rounded-full blur-[100px] opacity-20 pointer-events-none" />
            </div>
        </>
    )
}
