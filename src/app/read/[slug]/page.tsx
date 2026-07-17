"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Clock, CalendarDays, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { useQuery } from "convex/react"
import { api } from "@/../convex/_generated/api"
import { Skeleton } from "@/components/ui/skeleton"
import { use } from "react"
import { sanitizeBlogContent } from "@/lib/blog-content"

export default function SingleArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params)
    const post = useQuery(api.blog.getBySlug, { slug: resolvedParams.slug })
    const relatedPosts = useQuery(api.blog.getLatest, { limit: 3 })?.filter(p => p.slug !== resolvedParams.slug).slice(0, 3)

    if (post === undefined) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-24 pb-20 container mx-auto px-4 max-w-4xl mt-12">
                    <Skeleton className="w-48 h-6 mb-8" />
                    <Skeleton className="w-32 h-8 mb-6 mx-auto" />
                    <Skeleton className="w-full h-12 mb-6" />
                    <Skeleton className="w-3/4 h-12 mb-12 mx-auto" />
                    <Skeleton className="w-full aspect-[21/9] rounded-2xl mb-12" />
                    <Skeleton className="w-full h-4 mb-4" />
                    <Skeleton className="w-full h-4 mb-4" />
                    <Skeleton className="w-3/4 h-4" />
                </div>
            </main>
        )
    }

    if (post === null) {
        return (
            <main className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center pt-24 pb-20">
                    <h1 className="font-serif text-3xl font-bold mb-6 text-gray-900 dark:text-white">Article not found</h1>
                    <p className="text-muted-foreground mb-8">The article you are looking for does not exist or has been removed.</p>
                    <Link href="/read">
                        <Button className="bg-[#257300] hover:bg-[#257300]/90 text-white rounded-full">Back to Articles</Button>
                    </Link>
                </div>
                <Footer />
            </main>
        )
    }

    const renderedContent = sanitizeBlogContent(post.content)

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="relative pt-20 pb-16 overflow-hidden">
                {/* Gradient blobs for navbar visibility */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#257300]/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-gold/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-[#257300]/5 rounded-full blur-3xl" />
                </div>
                <div className="pt-24 pb-20">
                <article className="container mx-auto px-4 max-w-4xl">
                    <Link href="/read" className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#257300] mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
                    </Link>

                    <header className="mb-12 text-center">
                        <Badge className="bg-[#257300] hover:bg-[#257300]/90 text-white border-none mb-6">
                            {post.category || "General"}
                        </Badge>
                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-4 text-muted-foreground flex-wrap">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                    <Image src="/assets/img/pasi.jpg" alt={post.author || "Author"} fill className="object-cover" />
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{post.author || "Unknown"}</span>
                            </div>
                            <span>·</span>
                            <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {post.publishDate || new Date(post._creationTime).toLocaleDateString()}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
                        </div>
                    </header>

                    <div className="aspect-[21/9] w-full bg-muted rounded-2xl mb-12 overflow-hidden relative">
                        <Image
                            src={post.imageUrl || "/assets/img/pasi.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="mx-auto font-sans text-gray-700 dark:text-gray-300">
                        {post.excerpt && (
                            <p className="lead text-xl md:text-2xl font-serif text-gray-900 dark:text-white mb-8">
                                {post.excerpt}
                            </p>
                        )}
                        <div
                            className="blog-rich-text"
                            dangerouslySetInnerHTML={{ __html: renderedContent }}
                        />
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
                {relatedPosts && relatedPosts.length > 0 && (
                    <section className="container mx-auto px-4 mt-24">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-[2px] bg-gold" />
                            <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">Continue Reading</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-10">
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((article) => (
                                <Link key={article._id} href={`/read/${article.slug}`} className="group">
                                    <div className="bg-card dark:bg-white/5 rounded-2xl border border-border dark:border-white/10 overflow-hidden card-hover h-full flex flex-col">
                                        <div className="aspect-[16/9] overflow-hidden relative">
                                            <Image
                                                src={article.imageUrl || "/assets/img/pasi.jpg"}
                                                alt={article.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <span className="text-xs text-gold font-bold uppercase tracking-wider">{article.category || "General"}</span>
                                            <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-[#257300] dark:group-hover:text-[#B2CB20] transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                                            <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-[#257300] dark:text-[#B2CB20]">
                                                Read Article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
                </div>
            </div>
            <Footer />
        </main>
    )
}
