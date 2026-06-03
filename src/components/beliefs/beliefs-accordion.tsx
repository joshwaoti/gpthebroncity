"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BookOpen, ChevronDown } from "lucide-react"
import { beliefsData } from "@/data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function BeliefsAccordion() {
    const [openItem, setOpenItem] = useState<string | null>("scriptures")

    return (
        <section className="relative z-10 bg-background py-16 md:py-20">
            <div className="container mx-auto max-w-4xl px-4">
                <div className="mb-10 text-center">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                        Our Foundation
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                        What We Believe
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Our doctrine keeps the church anchored in Scripture, centered on Christ, and dependent on the Holy Spirit.
                    </p>
                </div>

                <div className="space-y-3">
                    {beliefsData.map((item, index) => (
                        <div
                            key={item.id}
                            className={cn(
                                "group overflow-hidden rounded-lg border transition-all duration-300",
                                openItem === item.id
                                    ? "border-primary/30 bg-card shadow-md shadow-primary/5"
                                    : "border-border bg-card/70 hover:border-primary/20 hover:bg-card"
                            )}
                        >
                            <button
                                onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                                className="flex w-full items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-6"
                            >
                                <div className="flex items-center gap-4">
                                    <span
                                        className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-md border text-sm font-bold transition-colors",
                                            openItem === item.id
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-border bg-muted text-muted-foreground group-hover:border-primary/30"
                                        )}
                                    >
                                        {index + 1}
                                    </span>
                                    <h3
                                        className={cn(
                                            "text-lg font-bold transition-colors md:text-2xl",
                                            openItem === item.id ? "text-primary" : "text-foreground"
                                        )}
                                    >
                                        {item.title}
                                    </h3>
                                </div>
                                <span
                                    className={cn(
                                        "rounded-md p-2 text-muted-foreground transition-all duration-300 group-hover:bg-muted",
                                        openItem === item.id && "rotate-180 bg-primary/10 text-primary"
                                    )}
                                >
                                    <ChevronDown className="h-5 w-5" />
                                </span>
                            </button>

                            <AnimatePresence>
                                {openItem === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-5 pb-6 md:px-6 md:pb-7">
                                            <div className="border-l-2 border-primary/20 pl-5">
                                                <p className="text-base leading-8 text-muted-foreground md:text-lg">
                                                    {item.content}
                                                </p>

                                                <div className="mt-6 flex flex-wrap gap-2">
                                                    {item.scriptures.map((scripture) => (
                                                        <Badge key={scripture} variant="secondary" className="gap-1.5 py-1">
                                                            <BookOpen className="h-3 w-3" />
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
            </div>
        </section>
    )
}
