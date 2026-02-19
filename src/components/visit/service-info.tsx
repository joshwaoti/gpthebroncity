"use client"

import { Button } from "@/components/ui/button"
import { visitPage } from "@/data"
import { MapPin, Clock } from "lucide-react"
import Link from "next/link"

export function ServiceInfo() {
    return (
        <section className="py-20 bg-background border-b border-border">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
                    {/* Service Times */}
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-display font-bold text-foreground">Service Times</h2>
                        </div>
                        <div className="space-y-4">
                            {visitPage.services.map((service, idx) => (
                                <div key={idx} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                                    <span className="text-muted-foreground font-medium">{service.day}</span>
                                    <div className="text-right">
                                        <span className="block text-lg font-bold text-foreground">{service.time}</span>
                                        <span className="text-xs text-primary uppercase tracking-wide font-bold">{service.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-6 text-center md:text-left">
                        <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                            <MapPin className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-display font-bold text-foreground">Directions</h2>
                        </div>
                        <p className="text-xl text-foreground font-medium max-w-md">
                            {visitPage.location.address}
                        </p>
                        <p className="text-muted-foreground">
                            We are conveniently located along the Eastern Bypass. Look for the GPT Hebron City sign!
                        </p>
                        <Link href={visitPage.location.mapLink} target="_blank">
                            <Button size="lg" className="gap-2 mt-4">
                                Open in Google Maps <MapPin className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
