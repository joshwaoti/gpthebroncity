"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ministriesPage } from "@/data"
import { CalendarDays, User, ArrowRight, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface Ministry {
    id: string
    title: string
    title_alias?: string
    description: string
    fullDescription?: string
    image: string
    schedule: string
    leader: string
}

export function MinistryGrid() {
    const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null)

    return (
        <>
            <section className="py-20 bg-background border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ministriesPage.items.map((ministry) => (
                            <div
                                key={ministry.id}
                                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                            >
                                <div className="h-48 relative overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url('${ministry.image}')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-display font-bold text-white">{ministry.title}</h3>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-muted-foreground mb-4 flex-1">{ministry.description}</p>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-foreground">
                                            <CalendarDays className="w-4 h-4 text-primary" />
                                            <span className="font-medium">{ministry.schedule}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-foreground">
                                            <User className="w-4 h-4 text-primary" />
                                            <span className="font-medium">Led by {ministry.leader}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-auto">
                                        {ministry.fullDescription && (
                                            <Button 
                                                variant="outline" 
                                                className="flex-1 justify-between group/btn"
                                                onClick={() => setSelectedMinistry(ministry)}
                                            >
                                                Read More
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Button>
                                        )}
                                        <Link href="/connect" className="flex-1">
                                            <Button variant="outline" className="w-full justify-between group/btn">
                                                Join Team
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedMinistry && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 overflow-y-auto"
                        onClick={() => setSelectedMinistry(null)}
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
                        
                        <div className="min-h-screen flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl my-8"
                            >
                                <div className="h-48 relative overflow-hidden rounded-t-2xl">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url('${selectedMinistry.image}')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <button
                                        onClick={() => setSelectedMinistry(null)}
                                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-2xl font-display font-bold text-white">{selectedMinistry.title}</h3>
                                        {selectedMinistry.title_alias && (
                                            <p className="text-white/70 text-sm">{selectedMinistry.title_alias}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-foreground">
                                            <CalendarDays className="w-4 h-4 text-primary" />
                                            <span className="font-medium">{selectedMinistry.schedule}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-foreground">
                                            <User className="w-4 h-4 text-primary" />
                                            <span className="font-medium">Led by {selectedMinistry.leader}</span>
                                        </div>
                                    </div>

                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="text-muted-foreground whitespace-pre-line">{selectedMinistry.fullDescription || selectedMinistry.description}</p>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-border">
                                        <Link href="/connect">
                                            <Button className="w-full">
                                                Join this Team
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
