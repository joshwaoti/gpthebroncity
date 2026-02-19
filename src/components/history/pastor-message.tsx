"use client"

import { Quote } from "lucide-react"
import Image from "next/image"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PastorMessage() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".pastor-content", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%"
                }
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative bg-background pt-24 pb-24">
            {/* Hero Image Section */}
            <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden mb-[-100px] z-0">
                <div className="absolute inset-0 bg-gray-900">
                    <Image
                        src="/assets/img/pasi.jpg"
                        alt="Pastor Albert & Mary Shitakwa"
                        fill
                        className="object-cover object-top opacity-80"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
                </div>

                <div className="absolute bottom-32 left-0 right-0 text-center z-10 px-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#B2CB20]/20 text-[#B2CB20] text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-sm border border-[#B2CB20]/30">
                        Senior Pastors
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-2 shadow-sm">
                        Pastor Albert & <br />
                        <span className="italic font-serif text-[#B2CB20]">Mary Shitakwa</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
                        Leading Green Pastures Tabernacle Hebron City with a vision to reveal Christ and express His love to our generation.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

                    {/* Left Sidebar - Timeline Navigation */}
                    <div className="hidden lg:block w-1/4 sticky top-32 pt-12">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8 pl-4 border-l-2 border-transparent">Our Journey</h3>
                        <div className="space-y-8 border-l-2 border-border ml-1">
                            <div className="pl-6 relative group cursor-pointer">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border-2 border-[#B2CB20] bg-background group-hover:bg-[#B2CB20] transition-colors"></div>
                                <span className="text-2xl font-display font-bold text-foreground block group-hover:text-[#B2CB20] transition-colors">2007</span>
                                <span className="text-sm text-foreground/60 font-medium">Inception</span>
                            </div>
                            <div className="pl-6 relative group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border-2 border-muted-foreground bg-background"></div>
                                <span className="text-2xl font-display font-bold text-foreground block">2013</span>
                                <span className="text-sm text-foreground/60 font-medium">Expansion</span>
                            </div>
                            <div className="pl-6 relative group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border-2 border-muted-foreground bg-background"></div>
                                <span className="text-2xl font-display font-bold text-foreground block">2018</span>
                                <span className="text-sm text-foreground/60 font-medium">Hebron City Vision</span>
                            </div>
                            <div className="pl-6 relative group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border-2 border-muted-foreground bg-background"></div>
                                <span className="text-2xl font-display font-bold text-[#B2CB20] block">Now</span>
                                <span className="text-sm text-foreground/60 font-medium">Building the Future</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Message Card */}
                    <div className="w-full lg:w-3/4">
                        <div className="pastor-content bg-card border border-border/50 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
                            {/* Decorative Quote Icon */}
                            <Quote className="absolute top-8 right-8 w-24 h-24 text-primary/5 -scale-x-100" />

                            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                                A Message from <br />
                                <span className="text-[#B2CB20]">Our Pastors</span>
                            </h2>

                            <div className="prose prose-lg dark:prose-invert mt-8 text-muted-foreground leading-relaxed">
                                <p>
                                    Welcome to Green Pastures Tabernacle Hebron City. We are humbled that you have chosen to connect with us. Our heart's desire is to see a generation rising that knows their God and does great exploits.
                                </p>
                                <p>
                                    Since 2007, God has been faithful to this house. We have seen lives transformed, families restored, and hope rekindled. Hebron City is not just a building project; it is a city of refuge, a place where the weary find rest and the purposeful find their launching pad.
                                </p>
                                <p>
                                    As we look toward the future, our vision remains clear: <span className="font-bold text-[#B2CB20]">Christ Revealed, Christ Expressed.</span> We believe that every individual has a unique part to play in this grand narrative of grace. Whether you are joining us for the first time or have been with us since the tent days, you are family.
                                </p>
                                <p>
                                    Let us build together, grow together, and serve the Lord with gladness.
                                </p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-border flex items-center justify-end">
                                <div className="text-right">
                                    {/* Signature / Name */}
                                    <p className="font-handwriting text-2xl text-foreground font-bold">Pst. Albert & Mary Shitakwa</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
