import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { GivingHero } from "@/components/giving/giving-hero"
import { GivingMethods } from "@/components/giving/giving-methods"

export const metadata: Metadata = {
    title: "Give | GPT Hebron City",
    description: "Support the vision and mission of GPT Hebron City through your giving.",
}

export default function GivingPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <GivingHero />
            <GivingMethods />
            <Footer />
        </main>
    )
}
