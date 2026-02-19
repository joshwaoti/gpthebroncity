import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { BeliefsHero } from "@/components/beliefs/beliefs-hero"
import { BeliefsAccordion } from "@/components/beliefs/beliefs-accordion"
import { HistoryCTA } from "@/components/history/cta"

export const metadata: Metadata = {
    title: "Our Beliefs | GPT Hebron City",
    description: "The doctrinal foundations and Statement of Faith of Green Pastures Tabernacle Hebron City.",
}

export default function BeliefsPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <BeliefsHero />
            <BeliefsAccordion />
            <HistoryCTA />
            <Footer />
        </main>
    )
}
