import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { PeerGroupsHero } from "@/components/peer-groups/peer-groups-hero"
import { PeerGroupsGrid } from "@/components/peer-groups/peer-groups-grid"
import { PeerGroupsCTA } from "@/components/peer-groups/peer-groups-cta"

export const metadata: Metadata = {
    title: "Peer Groups | GPT Hebron City",
    description: "Find your community at GPT Hebron City. Explore our peer groups — Eagles (Men), Wings (Women), Over-comers, Teens, Children's Church, and Marriage Ministry.",
}

export default function PeerGroupsPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <PeerGroupsHero />
            <PeerGroupsGrid />
            <PeerGroupsCTA />
            <Footer />
        </main>
    )
}
