"use client"

import { Button } from "@/components/ui/button"
import { homeData } from "@/data"
import { MapPin, Clock, Navigation } from "lucide-react"

export function VisitSection() {
    return (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-background dark:bg-[#0a0f05]">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-60 grayscale dark:mix-blend-overlay transition-all duration-300"
                style={{ backgroundImage: `url(${homeData.visit.bgImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-[#0a0f05] via-background/90 dark:via-[#0a0f05]/90 to-transparent transition-colors duration-300" />

            <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-[2px] bg-gold" />
                        <span className="text-gold font-bold tracking-widest uppercase text-xs">Visit Us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-8">{homeData.visit.title}</h2>

                    <div className="space-y-8 mb-10">
                        <div className="flex items-start gap-4">
                            <div className="bg-gold-light dark:bg-[#257300]/20 p-3 rounded-xl text-gold dark:text-[#B2CB20] border border-gold/10 dark:border-transparent">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{homeData.visit.campus.name}</h4>
                                <p className="text-muted-foreground leading-relaxed max-w-xs">{homeData.visit.campus.address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-gold-light dark:bg-[#257300]/20 p-3 rounded-xl text-gold dark:text-[#B2CB20] border border-gold/10 dark:border-transparent">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Service Times</h4>
                                <p className="text-muted-foreground">Sundays: <span className="text-gray-900 dark:text-white font-medium">{homeData.visit.times.sunday}</span></p>
                                <p className="text-muted-foreground">Wednesdays: <span className="text-gray-900 dark:text-white font-medium">{homeData.visit.times.wednesday}</span></p>
                            </div>
                        </div>
                    </div>

                    <Button size="lg">
                        <Navigation className="mr-2 w-4 h-4" /> {homeData.visit.action}
                    </Button>
                </div>

                {/* Real Google Map */}
                <div className="hidden md:block h-[400px] w-full rounded-2xl overflow-hidden border border-border dark:border-white/10 shadow-2xl">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818!2d36.966!3d-1.2756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13f1a20c0001%3A0x82d04d47dcb2e2e1!2sGPT%20Hebron%20City!5e0!3m2!1sen!2ske!4v1708300000000!5m2!1sen!2ske"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="GPT Hebron City Location"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </section>
    )
}
