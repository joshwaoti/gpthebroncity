import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { VisitHero } from "@/components/visit/visit-hero"
import { ServiceInfo } from "@/components/visit/service-info"
import { VisitFAQ } from "@/components/visit/visit-faq"

export const metadata: Metadata = {
    title: "Plan Your Visit | GPT Hebron City",
    description: "Join us for a service! Check out our service times, directions, and what to expect.",
}

export default function VisitPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <VisitHero />
            <ServiceInfo />
            <VisitFAQ />
            <Footer />
        </main>
    )
}
