"use client"

import { Button } from "@/components/ui/button"
import { homeData } from "@/data"
import { ArrowRight } from "lucide-react"

export function ProjectsGrid() {
    return (
        <section className="py-24 px-6 md:px-12 bg-background relative z-10 transition-colors duration-300">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-[2px] bg-gold" />
                            <h2 className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">{homeData.projects.subtitle}</h2>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white leading-tight">
                            {homeData.projects.title}
                        </h3>
                    </div>
                    <Button variant="link" className="text-gray-600 dark:text-gray-300 hover:text-[#257300] dark:hover:text-[#B2CB20] group">
                        {homeData.projects.linkText} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {homeData.projects.items.map((project) => (
                        <div
                            key={project.id}
                            className="group relative bg-card dark:bg-white/5 rounded-2xl overflow-hidden border border-border dark:border-white/10 hover:border-[#257300]/30 dark:hover:border-[#257300]/40 card-hover"
                        >
                            {/* Gold accent line at top */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#257300] via-gold to-[#257300] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                            <div className="aspect-[4/3] w-full bg-gray-900 relative overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${project.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f160a] via-transparent to-transparent opacity-90" />
                                {project.priority && (
                                    <div className="absolute top-4 right-4 bg-gold text-[#0a0f05] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                        Priority
                                    </div>
                                )}
                            </div>

                            <div className="p-6 relative -mt-20">
                                <div className="bg-card/95 dark:bg-[#0a0f05]/95 backdrop-blur-md rounded-xl p-6 border border-border dark:border-white/10 shadow-xl group-hover:-translate-y-2 transition-transform duration-300">
                                    <h4 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3">{project.title}</h4>
                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{project.description}</p>

                                    {/* Progress Bar */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-xs font-medium mb-2">
                                            <span className="text-gray-800 dark:text-gray-200">Raised: ${project.progress.current.toLocaleString()}</span>
                                            <span className="text-muted-foreground">Goal: ${project.progress.goal.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-muted dark:bg-white/10 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-[#257300] to-gold h-full rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${(project.progress.current / project.progress.goal) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <Button className="w-full text-xs font-bold">
                                        Give to This Project
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
