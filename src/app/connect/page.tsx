import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { ConnectHero } from "@/components/connect/connect-hero"
import { SocialConnect } from "@/components/connect/social-connect"
import { ContactForm } from "@/components/connect/contact-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CalendarDays, MapPin, Heart, Users } from "lucide-react"

export const metadata: Metadata = {
    title: "Connect | GPT Hebron City",
    description: "Get in touch with us, join our community, and stay updated.",
}

const quickActions = [
    {
        icon: CalendarDays,
        title: "Plan Your Visit",
        description: "Service times, parking, and everything you need for a great first visit.",
        href: "/visit",
        color: "from-[#257300] to-[#1a5200]",
    },
    {
        icon: Heart,
        title: "Give Online",
        description: "Support the mission with your tithes, offerings, and project giving.",
        href: "/give",
        color: "from-gold to-amber-600",
    },
    {
        icon: Users,
        title: "Join a Ministry",
        description: "Find your place. Serve, grow, and build lasting community.",
        href: "/ministries",
        color: "from-blue-600 to-indigo-700",
    },
    {
        icon: MapPin,
        title: "Events Calendar",
        description: "See what's coming up — fellowship, worship nights, and outreach.",
        href: "/events",
        color: "from-purple-600 to-pink-600",
    },
]

export default function ConnectPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <ConnectHero />

            {/* Quick Actions Grid */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="w-8 h-[2px] bg-gold" />
                            <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">
                                Get Involved
                            </span>
                            <div className="w-8 h-[2px] bg-gold" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">How Can We Help?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Whether you're new or have been with us for years, there's always a next step.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                        {quickActions.map((action) => (
                            <Link
                                key={action.title}
                                href={action.href}
                                className="group relative overflow-hidden rounded-2xl bg-card dark:bg-white/5 border border-border dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Top gradient bar */}
                                <div className={`h-1.5 bg-gradient-to-r ${action.color}`} />

                                <div className="p-6">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <action.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-[#257300] dark:group-hover:text-[#B2CB20] transition-colors">
                                        {action.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                        {action.description}
                                    </p>
                                    <span className="inline-flex items-center text-sm font-medium text-[#257300] dark:text-[#B2CB20] gap-1 group-hover:gap-2 transition-all">
                                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <SocialConnect />
            <ContactForm />
            <Footer />
        </main>
    )
}
