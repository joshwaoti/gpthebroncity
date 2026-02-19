import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { ProjectsHero } from "@/components/projects/projects-hero"
import { ChildrensBlock } from "@/components/projects/childrens-block"
import { ProjectsList } from "@/components/projects/projects-list"
import { PartnerCTA } from "@/components/projects/partner-cta"

export const metadata: Metadata = {
    title: "Projects | GPT Hebron City",
    description: "Building the Next Gen Church. Track our progress and partner with us in building a legacy for future generations.",
}

export default function ProjectsPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <ProjectsHero />
            <ChildrensBlock />
            <ProjectsList />
            <PartnerCTA />
            <Footer />
        </main>
    )
}
