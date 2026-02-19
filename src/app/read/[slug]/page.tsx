
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Clock, CalendarDays, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

const RELATED_ARTICLES = [
    {
        title: "Navigating Faith in the Marketplace",
        excerpt: "How do we carry the Kingdom into our corporate spaces?",
        date: "Feb 15, 2026",
        author: "Mary Shitakwa",
        category: "Leadership",
        image: "/assets/img/pasi.jpg",
        slug: "faith-in-marketplace",
        readTime: "4 min"
    },
    {
        title: "The Next Gen Church: Building for 2030",
        excerpt: "A look at the strategic vision behind our new infrastructure projects.",
        date: "Feb 10, 2026",
        author: "Bishop Stanley Mwalili",
        category: "Vision",
        image: "/assets/img/pasi.jpg",
        slug: "next-gen-church",
        readTime: "6 min"
    },
    {
        title: "Understanding the Trinity",
        excerpt: "A deep dive into one of the most complex and beautiful mysteries of our faith.",
        date: "Feb 5, 2026",
        author: "Theology Team",
        category: "Doctrine",
        image: "/assets/img/pasi.jpg",
        slug: "understanding-trinity",
        readTime: "8 min"
    }
]

export default function SingleArticlePage({ params }: { params: { slug: string } }) {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 pb-20">
                <article className="container mx-auto px-4 max-w-4xl">
                    <Link href="/read" className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#257300] mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
                    </Link>

                    <header className="mb-12 text-center">
                        <Badge className="bg-[#257300] text-white border-none mb-6">
                            Theology
                        </Badge>
                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            The Theology of Community: Why We Gather
                        </h1>

                        <div className="flex items-center justify-center gap-4 text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                    <Image src="/assets/img/pasi.jpg" alt="Pastor Albert" fill className="object-cover" />
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">Pastor Albert Shitakwa</span>
                            </div>
                            <span>·</span>
                            <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> Feb 18, 2026</span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
                        </div>
                    </header>

                    <div className="aspect-[21/9] w-full bg-muted rounded-2xl mb-12 overflow-hidden">
                        <img
                            src="/assets/img/pasi.jpg"
                            alt="Community Gathering"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="prose prose-lg dark:prose-invert mx-auto font-sans text-gray-700 dark:text-gray-300">
                        <p className="lead text-xl md:text-2xl font-serif text-gray-900 dark:text-white mb-8">
                            In an increasingly digital world, the physical gathering of believers remains a cornerstone of spiritual growth.
                        </p>
                        <p>
                            The early church understood something that modern believers sometimes forget: authentic community requires proximity. When we gather together in worship, we participate in something sacred — a tangible expression of the body of Christ working in unity.
                        </p>
                        <h2>The Biblical Mandate</h2>
                        <p>
                            Throughout Scripture, we see a consistent pattern of God's people gathering together. From the tabernacle in the wilderness to Solomon's temple, from synagogues to the upper room, God has always called His people to assemble. This is not merely tradition — it is a divine design.
                        </p>
                        <blockquote>
                            "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together..."
                            <cite>— Hebrews 10:24-25</cite>
                        </blockquote>
                        <p>
                            The writer of Hebrews understood that isolation weakens faith while community strengthens it. When we gather, we bring our gifts, our struggles, and our faith into a shared space where iron sharpens iron.
                        </p>
                        <h2>Community in Practice</h2>
                        <p>
                            At GPT Hebron City, we believe that every service, every Bible study, every fellowship meal is an opportunity to experience the Kingdom of God on earth. Our gathering is not an obligation — it is a celebration of what God is doing among us.
                        </p>
                        <p>
                            As we look toward the future, our commitment to community remains unwavering. Whether through in-person gatherings at our Utawala campus or through our expanding digital outreach, the heartbeat of Hebron City is relationship — with God and with one another.
                        </p>
                    </div>

                    {/* Share Section */}
                    <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
                        <div className="font-medium text-gray-900 dark:text-white">
                            Share this article
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Facebook className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Twitter className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Linkedin className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                <section className="container mx-auto px-4 mt-24">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-[2px] bg-gold" />
                        <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">Continue Reading</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-10">
                        Related Articles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {RELATED_ARTICLES.map((article, i) => (
                            <Link key={i} href={`/read/${article.slug}`} className="group">
                                <div className="bg-card dark:bg-white/5 rounded-2xl border border-border dark:border-white/10 overflow-hidden card-hover">
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-6">
                                        <span className="text-xs text-gold font-bold uppercase tracking-wider">{article.category}</span>
                                        <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-[#257300] dark:group-hover:text-[#B2CB20] transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                                        <div className="mt-4 flex items-center text-sm font-semibold text-[#257300] dark:text-[#B2CB20]">
                                            Read Article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    )
}
