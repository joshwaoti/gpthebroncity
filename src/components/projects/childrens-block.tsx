"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight, Download, Share2, Shield, Users, Warehouse } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ChildrensBlock() {
    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left: Interactive Model / Visuals */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-gray-100">
                            {/* Placeholder for 3D Model or Hero Image */}
                            <div className="absolute inset-0 bg-gray-200">
                                <Image
                                    src="/assets/img/construct.jpg"
                                    alt="Children's Church Block Render"
                                    fill
                                    className="object-cover"
                                />
                            </div>



                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                                <h3 className="text-2xl font-display font-bold mb-1">Children's Church Block</h3>
                                <p className="text-sm text-gray-300">Phase 2 In Progress</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content & Timeline */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-12">
                            <span className="text-[#65A30D] font-bold tracking-widest uppercase text-xs mb-4 block">Project Overview</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                A vision for the future of our children&apos;s ministry.
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                We are now in the phase of building the Children's Ministry Block and more church facilities as God raises us to new levels and new dimensions. This sanctuary is designed specifically for the next generation—a space that fosters learning, safety, and spiritual growth.
                            </p>


                        </div>



                        {/* Timeline */}
                        <div className="space-y-12 relative border-l-2 border-dashed border-gray-200 dark:border-white/10 ml-4 pl-12">
                            {/* Item 1 */}
                            <div className="relative group">
                                <div className="absolute -left-[57px] top-0 w-8 h-8 rounded-full border-2 border-green-500 bg-white dark:bg-black flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                </div>
                                <span className="text-green-600 font-bold text-xs uppercase tracking-wider mb-2 block">Phase 1 - Completed</span>
                                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">Foundation & Structure</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    The groundwork has been laid. We have completed the excavation, poured the concrete foundation, and erected the steel framework.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden border border-border">
                                        <Image src="/assets/img/foundation_1.jpg" alt="Foundation Phase 1" fill className="object-cover" />
                                    </div>
                                    <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden border border-border">
                                        <Image src="/assets/img/foundation_2.jpg" alt="Foundation Phase 2" fill className="object-cover" />
                                    </div>
                                    <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden border border-border">
                                        <Image src="/assets/img/foundation_3.jpg" alt="Foundation Phase 3" fill className="object-cover" />
                                    </div>
                                </div>
                            </div>

                            {/* Item 2 - Active */}
                            <div className="relative group">
                                <div className="absolute -left-[57px] top-0 w-8 h-8 rounded-full bg-[#65A30D] flex items-center justify-center shadow-lg shadow-green-500/30">
                                    <span className="text-white text-xs font-bold">2</span>
                                </div>
                                <span className="text-[#65A30D] font-bold text-xs uppercase tracking-wider mb-2 block">Phase 2 - In Progress</span>
                                <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                                    <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">Hebron City - Children's Ministry Block</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Designed for modern learning, the new block features sound-proofed classrooms, adaptable furniture, and integrated AV systems for our growing children's congregation.
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        {[
                                            "12 Sound-proofed rooms",
                                            "Smart-board integration",
                                            "Capacity for 300+ children"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200">
                                                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="relative group opacity-60">
                                <div className="absolute -left-[57px] top-0 w-8 h-8 rounded-full border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-black flex items-center justify-center text-gray-400 font-bold text-xs">
                                    3
                                </div>
                                <span className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-2 block">Phase 3 - Upcoming</span>
                                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">Safety Features</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    State-of-the-art security including biometric check-ins, monitored surveillance, and secure perimeter fencing.
                                </p>
                            </div>
                        </div>

                        {/* Footer Call to Action (Legacy) */}
                        <div className="mt-20 pt-10 border-t border-gray-100 dark:border-white/10 text-center">
                            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Be Part of the Legacy</h3>
                            <p className="text-gray-500 mb-6">Your partnership today builds the spiritual home for tomorrow's leaders.</p>
                            <div className="flex justify-center gap-4">
                                <Link href="/give">
                                    <Button className="bg-[#3F6212] hover:bg-[#365314] rounded-full px-6">Join the Vision</Button>
                                </Link>
                                <Link href="/projects">
                                    <Button variant="outline" className="rounded-full px-6"><Share2 className="w-4 h-4 mr-2" /> Share Project</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
