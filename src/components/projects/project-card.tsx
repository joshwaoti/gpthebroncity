"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectProps {
    id: number
    title: string
    description: string
    image: string
    progress: {
        current: number
        goal: number
    }
    priority?: boolean
}

export function ProjectCard({ project }: { project: ProjectProps }) {
    return (
        <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
            {/* Image Section */}
            <div className="aspect-[4/3] w-full bg-gray-900 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f160a] via-transparent to-transparent opacity-90" />
                {project.priority && (
                    <div className="absolute top-4 right-4 bg-[#257300] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Priority
                    </div>
                )}
            </div>

            {/* Content Overlap Section */}
            <div className="p-6 relative -mt-20">
                <div className="p-6 relative -mt-20">
                    <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-xl group-hover:-translate-y-2 transition-transform duration-300">
                        <h4 className="text-xl font-display font-bold text-[#257300] dark:text-white mb-3">{project.title}</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-6 line-clamp-2">{project.description}</p>

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between text-xs font-medium mb-2">
                                <span className="text-gray-900 dark:text-white font-bold">Raised: ${project.progress.current.toLocaleString()}</span>
                                <span className="text-gray-600 dark:text-gray-400">Goal: ${project.progress.goal.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="bg-[#257300] dark:bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${Math.min((project.progress.current / project.progress.goal) * 100, 100)}%` }}
                                />
                            </div>
                        </div>

                        <Button className="w-full text-xs font-bold bg-[#257300] text-white hover:bg-[#1e5c00] dark:bg-primary dark:text-white dark:hover:bg-primary/90 border-transparent shadow-md">
                            Give to This Project
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
