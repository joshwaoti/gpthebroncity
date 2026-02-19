"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { beliefsData } from "@/data"
import { Badge } from "@/components/ui/badge"

export function BeliefsAccordion() {
    const [openItem, setOpenItem] = useState<string | null>("scriptures")

    return (
        <section className="py-20 bg-background relative z-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="space-y-4">
                    {beliefsData.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                "group rounded-2xl border transition-all duration-300 overflow-hidden",
                                openItem === item.id
                                    ? "bg-card border-primary/20 shadow-lg shadow-primary/5"
                                    : "bg-card/50 border-border hover:border-primary/10 hover:bg-card/80"
                            )}
                        >
                            <button
                                onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                            >
                                <div className="flex items-center gap-4">
                                    <span className={cn(
                                        "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border transition-colors",
                                        openItem === item.id
                                            ? "bg-primary text-white border-primary"
                                            : "bg-muted text-muted-foreground border-border group-hover:border-primary/30"
                                    )}>
                                        {beliefsData.indexOf(item) + 1}
                                    </span>
                                    <h3 className={cn(
                                        "text-xl md:text-2xl font-display font-bold transition-colors",
                                        openItem === item.id ? "text-primary" : "text-foreground"
                                    )}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div className={cn(
                                    "p-2 rounded-full transition-all duration-300",
                                    openItem === item.id ? "bg-primary/10 text-primary rotate-180" : "text-muted-foreground group-hover:bg-muted"
                                )}>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openItem === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-8 md:px-8 md:pb-10 pt-0">
                                            <div className="pl-12 md:pl-14">
                                                <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-2 border-primary/20 pl-6">
                                                    {item.content}
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {item.scriptures.map((scripture, idx) => (
                                                        <Badge
                                                            key={idx}
                                                            variant="secondary"
                                                            className="gap-1.5 py-1"
                                                        >
                                                            <BookOpen className="w-3 h-3" />
                                                            {scripture}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div >
        </section >
    )
}
