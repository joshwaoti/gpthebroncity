
"use client"

import { useState } from "react"
import { FeaturedArticle } from "@/components/blog/featured-article"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogFilters } from "@/components/blog/blog-filters"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

// Dummy Data
const BLOG_POSTS = [
    {
        id: "1",
        title: "The Theology of Community: Why We Gather",
        excerpt: "In an increasingly digital world, the physical gathering of believers remains a cornerstone of spiritual growth. Explore the biblical mandate for community and how it shapes our identity as the body of Christ.",
        date: "Feb 18, 2026",
        author: "Pastor Albert Shitakwa",
        category: "Theology",
        image: "/assets/img/pasi.jpg",
        slug: "theology-of-community",
        readTime: "5 min",
        featured: true
    },
    {
        id: "2",
        title: "Navigating Faith in the Marketplace",
        excerpt: "How do we carry the Kingdom into our corporate spaces? Practical wisdom for professionals seeking to be salt and light in their workplaces.",
        date: "Feb 15, 2026",
        author: "Mary Shitakwa",
        category: "Leadership",
        image: "/assets/img/pasi.jpg",
        slug: "faith-in-marketplace",
        readTime: "4 min",
        featured: false
    },
    {
        id: "3",
        title: "The Next Gen Church: Building for 2030",
        excerpt: "A look at the strategic vision behind our new infrastructure projects and how they will serve the next generation of believers.",
        date: "Feb 10, 2026",
        author: "Bishop Stanley Mwalili",
        category: "Vision",
        image: "/assets/img/pasi.jpg",
        slug: "next-gen-church",
        readTime: "6 min",
        featured: false
    },
    {
        id: "4",
        title: "Understanding the Trinity",
        excerpt: "A deep dive into one of the most complex and beautiful mysteries of our faith. Why the triune nature of God matters for our daily walk.",
        date: "Feb 5, 2026",
        author: "Theology Team",
        category: "Doctrine",
        image: "/assets/img/pasi.jpg",
        slug: "understanding-trinity",
        readTime: "8 min",
        featured: false
    }
]

const CATEGORIES = ["Theology", "Leadership", "Vision", "Doctrine", "Family"]

export default function ReadPage() {
    const [activeCategory, setActiveCategory] = useState('All')

    const featuredPost = BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0]
    const listPosts = BLOG_POSTS.filter(post =>
        !post.featured && (activeCategory === 'All' || post.category === activeCategory)
    )

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 pb-20">
                <section className="container mx-auto px-4 mb-16">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="w-8 h-[2px] bg-gold" />
                            <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">
                                Our Blog
                            </span>
                            <div className="w-8 h-[2px] bg-gold" />
                        </div>
                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            Theological <span className="text-[#257300] dark:text-[#B2CB20]">Insights</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Resources to help you grow in faith, leadership, and life.
                        </p>
                    </div>

                    <FeaturedArticle {...featuredPost} />
                </section>

                <section className="container mx-auto px-4">
                    <BlogFilters
                        categories={CATEGORIES}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listPosts.map((post) => (
                            <BlogCard key={post.id} {...post} />
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    )
}
