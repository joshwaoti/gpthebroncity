import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { MinistriesHero } from "@/components/ministries/ministries-hero"
import { MinistryGrid } from "@/components/ministries/ministry-grid"
import { MinistryCTA } from "@/components/ministries/ministry-cta"

export const metadata: Metadata = {
    title: "Service Teams | GPT Hebron City",
    description: "Discover our service teams at GPT Hebron City — Protocol, Hebron City Voices, and the Intercessory Ministry. Find where you can actively serve.",
}

export default function MinistriesPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <MinistriesHero />
            <MinistryGrid />
            <MinistryCTA />
            <Footer />
        </main>
    )
}
