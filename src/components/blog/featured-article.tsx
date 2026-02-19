
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FeaturedArticleProps {
    title: string
    excerpt: string
    date: string
    author: string
    category: string
    image: string
    slug: string
    readTime: string
}

export function FeaturedArticle({
    title,
    excerpt,
    date,
    author,
    category,
    image,
    slug,
    readTime
}: FeaturedArticleProps) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-black aspect-[4/3] md:aspect-[21/9] group">
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                <div className="max-w-3xl">
                    <Badge className="bg-[#257300] hover:bg-[#257300]/90 text-white border-none mb-4">
                        {category}
                    </Badge>

                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {title}
                    </h2>

                    <p className="text-lg text-gray-200 mb-6 line-clamp-2 md:line-clamp-none max-w-2xl">
                        {excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-3 text-white/80">
                            <img
                                src="/assets/img/pasi.jpg"
                                alt={author}
                                className="w-10 h-10 rounded-full border-2 border-white/20 bg-white"
                            />
                            <div className="flex flex-col text-sm">
                                <span className="font-medium text-white">{author}</span>
                                <span className="text-white/60">{date} · {readTime} read</span>
                            </div>
                        </div>

                        <Link href={`/read/${slug}`}>
                            <Button size="lg" className="bg-white text-black hover:bg-gray-100 border-none rounded-full gap-2">
                                Read Full Story
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
