import { PastorMessage } from "@/components/history/pastor-message"
import { HistoryHero } from "@/components/history/history-hero"
import { Timeline } from "@/components/history/timeline"
import { Stats } from "@/components/history/stats"
import { HistoryCTA } from "@/components/history/cta"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import TeamShowcase from "@/components/ui/team-showcase"
import { historyData } from "@/data"

export default function HistoryPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <HistoryHero />
            <PastorMessage />
            <Stats />
            <Timeline />
            <TeamShowcase members={historyData.pastors} />
            <HistoryCTA />
            <Footer />
        </main>
    )
}
