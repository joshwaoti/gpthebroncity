import { Hero } from "@/components/home/hero"
import { ProjectsGrid } from "@/components/home/projects-grid"
import { LatestSermon } from "@/components/home/latest-sermon"
import { VisitSection } from "@/components/home/visit-cta"
import Navbar from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { UpcomingEvents } from "@/components/home/upcoming-events"
import { LatestInsights } from "@/components/home/latest-insights"
import { SocialsSection } from "@/components/home/socials-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background dark:bg-[#0a0f05]">
      <Navbar />
      <Hero />
      <ProjectsGrid />
      <LatestSermon />
      <UpcomingEvents />
      <LatestInsights />
      <SocialsSection />
      <VisitSection />
      <Footer />
    </main>
  )
}
