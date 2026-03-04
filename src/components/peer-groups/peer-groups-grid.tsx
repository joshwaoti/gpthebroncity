"use client"

import { peerGroupsPage } from "@/data"
import { CalendarDays, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PeerGroupsGrid() {
    return (
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
                                <p className="text-muted-foreground mb-6 flex-1">{group.description}</p>

                                <div className="flex items-center gap-2 text-sm text-foreground mb-6">
                                    <CalendarDays className="w-4 h-4 text-primary" />
                                    <span className="font-medium">{group.schedule}</span>
                                </div>

                                <Link href="/connect" className="mt-auto">
                                    <Button variant="outline" className="w-full justify-between group/btn">
                                        Join this Group
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
