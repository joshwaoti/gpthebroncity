"use client"

import { useState } from "react"
import { peerGroupsPage } from "@/data"
import { CalendarDays, Users, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface PeerGroup {
    id: string
    title: string
    subtitle: string
    description: string
    fullDescription?: string
    image: string
    schedule: string
    targetGroup: string
}

export function PeerGroupsGrid() {
    const [selectedGroup, setSelectedGroup] = useState<PeerGroup | null>(null)

    return (
        <>
            <section className="py-20 bg-background border-b border-border">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {peerGroupsPage.items.map((group) => (
                            <div
                                key={group.id}
                                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                            >
                                <div className="h-48 relative overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url('${group.image}')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="text-xs font-bold text-primary bg-primary/20 px-3 py-1 rounded-full border border-primary/30 mb-1 inline-block">
                                            {group.targetGroup}
                                        </span>
                                        <h3 className="text-xl font-display font-bold text-white">{group.title}</h3>
                                        <p className="text-white/70 text-sm">{group.subtitle}</p>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-muted-foreground mb-4 flex-1">{group.description}</p>

                                    <div className="flex items-center gap-2 text-sm text-foreground mb-6">
                                        <CalendarDays className="w-4 h-4 text-primary" />
                                        <span className="font-medium">{group.schedule}</span>
                                    </div>

                                    <div className="flex gap-2 mt-auto">
                                        {group.fullDescription && (
                                            <Button 
                                                variant="outline" 
                                                className="flex-1 justify-between group/btn"
                                                onClick={() => setSelectedGroup(group)}
                                            >
                                                Read More
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Button>
                                        )}
                                        <Link href="/connect" className="flex-1">
                                            <Button variant="outline" className="w-full justify-between group/btn">
                                                Join Group
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
                {selectedGroup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 overflow-y-auto"
                        onClick={() => setSelectedGroup(null)}
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
                                        style={{ backgroundImage: `url('${selectedGroup.image}')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <button
                                        onClick={() => setSelectedGroup(null)}
                                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="text-xs font-bold text-primary bg-primary/20 px-3 py-1 rounded-full border border-primary/30 mb-1 inline-block">
                                            {selectedGroup.targetGroup}
                                        </span>
                                        <h3 className="text-2xl font-display font-bold text-white">{selectedGroup.title}</h3>
                                        <p className="text-white/70 text-sm">{selectedGroup.subtitle}</p>
                                    </div>
                                </div>

                                <div className="p-6" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                                    <div className="flex items-center gap-2 text-sm text-foreground mb-6">
                                        <CalendarDays className="w-4 h-4 text-primary" />
                                        <span className="font-medium">{selectedGroup.schedule}</span>
                                    </div>

                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="text-muted-foreground whitespace-pre-line">{selectedGroup.fullDescription || selectedGroup.description}</p>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-border">
                                        <Link href="/connect">
                                            <Button className="w-full">
                                                Join this Group
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
