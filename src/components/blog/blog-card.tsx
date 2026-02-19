
import Link from "next/link"
import { ArrowRight, User, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
    title: string
    excerpt: string
    date: string
    author: string
    category: string
    image: string
    slug: string
    readTime: string
}

export function BlogCard({
    title,
    excerpt,
    date,
    author,
    category,
    image,
    slug,
    readTime
}: BlogCardProps) {
    return (
        <div className="group flex flex-col h-full bg-card dark:bg-white/5 rounded-2xl border border-border dark:border-white/10 overflow-hidden hover:border-[#257300]/30 dark:hover:border-[#257300]/40 card-hover">
            {/* Gold accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#257300] via-gold to-[#257300] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            <div className="relative aspect-[16/9] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Badge
                    variant="secondary"
                    className="absolute top-4 right-4 bg-card/95 dark:bg-black/90 text-[#257300] dark:text-[#B2CB20] shadow-sm backdrop-blur-sm border border-gold/20 hover:bg-card"
                >
                    {category}
                </Badge>
            </div>

            <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold" />
                        {date}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gold" />
                        {author}
                    </span>
                </div>

                <h3 className="flex-1 font-serif text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#257300] dark:group-hover:text-[#B2CB20] transition-colors line-clamp-2">
                    {title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                    {excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-border dark:border-white/5 pt-4">
                    <span className="text-xs font-medium text-muted-foreground">
                        {readTime} read
                    </span>
                    <Link
                        href={`/read/${slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#257300] dark:text-[#B2CB20] hover:underline group/link"
                    >
                        Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
