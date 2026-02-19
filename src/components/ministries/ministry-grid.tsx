"use client"

import { Button } from "@/components/ui/button"
import { ministriesPage } from "@/data"
import { CalendarDays, User, ArrowRight } from "lucide-react"
import Link from "next/link"

export function MinistryGrid() {
    return (
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
                                <p className="text-muted-foreground mb-6 flex-1">{ministry.description}</p>

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

                                <Link href="/connect" className="mt-auto">
                                    <Button variant="outline" className="w-full justify-between group/btn">
                                        Get Involved
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
