import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { AboutHero } from "@/components/about/about-hero"
import { VisionMission } from "@/components/about/vision-mission"
import { CoreValues } from "@/components/about/core-values"
import { OurIdentity } from "@/components/about/our-identity"
import { HistoryCTA } from "@/components/history/cta"
import { BeliefsAccordion } from "@/components/beliefs/beliefs-accordion"

export const metadata: Metadata = {
    title: "About Us | GPT Hebron City",
    description: "Learn about GPT Hebron City — our vision, mission, identity, core values, and what drives us as a community of believers.",
}

export default function AboutPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <AboutHero />
            <VisionMission />
            <OurIdentity />
            <CoreValues />
            <BeliefsAccordion />
            <HistoryCTA />
            <Footer />
        </main>
    )
}
