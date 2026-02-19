import { PastorMessage } from "@/components/history/pastor-message"
import { Timeline } from "@/components/history/timeline"
import { Stats } from "@/components/history/stats"
import { HistoryCTA } from "@/components/history/cta"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export default function HistoryPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <PastorMessage />
            <Stats />
            <Timeline />
            <HistoryCTA />
            <Footer />
        </main>
    )
}
