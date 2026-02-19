import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { MediaHero } from "@/components/media/media-hero"
import { MediaGrid } from "@/components/media/media-grid"

export const metadata: Metadata = {
    title: "Media Archive | GPT Hebron City",
    description: "Watch and listen to the latest sermons, worship sessions, and special events from Green Pastures Tabernacle Hebron City.",
}

export default function MediaPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <MediaHero />
            <MediaGrid />
            <Footer />
        </main>
    )
}
