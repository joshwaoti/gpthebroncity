import { Metadata } from "next"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { ConnectHero } from "@/components/connect/connect-hero"
import { SocialConnect } from "@/components/connect/social-connect"
import { ContactForm } from "@/components/connect/contact-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Connect | GPT Hebron City",
    description: "Get in touch with us, join our community, and stay updated.",
}

export default function ConnectPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <ConnectHero />
            <div className="py-12 bg-background border-b border-border text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-display font-bold mb-4 text-foreground">Planning a Visit?</h2>
                    <p className="text-muted-foreground mb-6">We'd love to host you this Sunday. Check out our service times and location.</p>
                    <Link href="/visit">
                        <Button size="lg" className="rounded-full px-8">Plan Your Visit &rarr;</Button>
                    </Link>
                </div>
            </div>
            <SocialConnect />
            <ContactForm />
            <Footer />
        </main>
    )
}
