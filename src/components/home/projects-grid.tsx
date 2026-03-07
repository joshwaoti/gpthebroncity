"use client"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { homeData } from "@/data"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ProjectsGrid() {
    const project = homeData.projects.items[0]

    return (
        <section className="py-24 px-6 md:px-12 bg-white dark:bg-[#0a0f05] relative overflow-hidden transition-colors duration-300">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent dark:bg-white/5 skew-x-12 translate-x-32 transition-colors duration-300" />

            <div className="container mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-3 mb-6 bg-[#257300]/10 dark:bg-[#B2CB20]/10 px-4 py-2 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-[#257300] animate-pulse" />
                        <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-[0.2em] uppercase text-xs">Featured Project</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-6">
                        Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#257300] to-gold">Next Gen</span> Church
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center bg-card dark:bg-white/5 rounded-[2.5rem] overflow-hidden border border-border dark:border-white/10 shadow-2xl shadow-black/5">
                    {/* Visual Side */}
                    <div className="relative aspect-square lg:aspect-auto lg:h-[600px] group overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundImage: `url(${project.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />

                        <div className="absolute bottom-8 left-8 right-8">
                            <GlassCard className="p-6 border-white/20 bg-white/10 backdrop-blur-xl">
                                <h4 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h4>
                                <div className="flex items-center gap-2 text-[#B2CB20]">
                                    <div className="w-8 h-[2px] bg-[#B2CB20]" />
                                    <span className="text-sm font-bold uppercase tracking-widest">Target 2026</span>
                                </div>
                            </GlassCard>
                        </div>
                    </div>

                    {/* Info Side */}
                    <div className="p-8 md:p-12 lg:p-16">
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
                            {project.description}
                        </p>

                        <div className="space-y-6 mb-12">
                            {project.details?.map((detail, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-[#257300]/10 dark:bg-[#B2CB20]/10 flex items-center justify-center text-[#257300] dark:text-[#B2CB20] group-hover:bg-[#257300] group-hover:text-white transition-all duration-300">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{detail}</span>
                                </div>
                            ))}
                        </div>

                        {/* Project Context */}
                        <div className="bg-accent dark:bg-white/5 p-8 rounded-3xl border border-border dark:border-white/10 mb-10">
                            <h4 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3">Tujenge NextGen Church – Building for the Future</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                At Hebron City Church, we believe that children are not just the church of tomorrow — they are the church of today. They are a precious gift entrusted to us, and it is our responsibility to create an environment where they can grow in faith, discover Christ, and be firmly established in His ways.
                            </p>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                For years, our children have faithfully gathered for church services in tents. While their joy and hunger for God have remained strong, the challenges have been real. During rainy seasons, services are interrupted by leaking tents and muddy grounds. On hot days, the intense heat makes it uncomfortable for them to fully concentrate and participate.
                            </p>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                On 12th December 2023, we officially broke ground for our Children's Church building project, dubbed "Tujenge NextGen Church." It was a historic and faith-filled moment as Bishop Mwalili graciously joined us to preside over the groundbreaking ceremony.
                            </p>
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#257300] dark:text-[#B2CB20]">
                                <span className="w-2 h-2 rounded-full bg-[#257300] animate-pulse"></span>
                                Help Us Build the Future
                            </div>
                        </div>

                        <Link href="/give">
                            <Button size="xl" className="w-full rounded-2xl py-8 text-lg font-bold shadow-2xl shadow-primary/20 group">
                                Partner With Us <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
