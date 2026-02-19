
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog/blog-card"

const LATEST_INSIGHTS = [
    {
        id: "1",
        title: "The Theology of Community: Why We Gather",
        excerpt: "In an increasingly digital world, the physical gathering of believers remains a cornerstone of spiritual growth.",
        date: "Feb 18, 2026",
        author: "Pastor Albert",
        category: "Theology",
        image: "/assets/img/pasi.jpg",
        slug: "theology-of-community",
        readTime: "5 min"
    },
    {
        id: "2",
        title: "Navigating Faith in the Marketplace",
        excerpt: "How do we carry the Kingdom into our corporate spaces? Practical wisdom for professionals.",
        date: "Feb 15, 2026",
        author: "Mary Shitakwa",
        category: "Leadership",
        image: "/assets/img/pasi.jpg",
        slug: "faith-in-marketplace",
        readTime: "4 min"
    },
    {
        id: "3",
        title: "The Next Gen Church: Building for 2030",
        excerpt: "A look at the strategic vision behind our new infrastructure projects.",
        date: "Feb 10, 2026",
        author: "Bishop Mwalili",
        category: "Vision",
        image: "/assets/img/pasi.jpg",
        slug: "next-gen-church",
        readTime: "6 min"
    }
]

export function LatestInsights() {
    return (
        <section className="py-24 bg-accent dark:bg-black relative">
            {/* Subtle pattern */}
            <div className="absolute inset-0 section-pattern dark:opacity-0 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-[2px] bg-gold" />
                            <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">
                                Read
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            Latest Insights
                        </h2>
                    </div>
                    <Link href="/read">
                        <Button variant="link" className="text-[#257300] dark:text-[#B2CB20] gap-2">
                            View All Articles <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {LATEST_INSIGHTS.map(post => (
                        <BlogCard key={post.id} {...post} />
                    ))}
                </div>
            </div>
        </section>
    )
}
