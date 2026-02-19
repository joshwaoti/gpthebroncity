import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { MinistriesHero } from "@/components/ministries/ministries-hero"
import { MinistryGrid } from "@/components/ministries/ministry-grid"
import { MinistryCTA } from "@/components/ministries/ministry-cta"

export const metadata: Metadata = {
    title: "Ministries | GPT Hebron City",
    description: "Discover the vibrant ministries at GPT Hebron City. From Kids to Men and Women, there's a place for you to serve and belong.",
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
