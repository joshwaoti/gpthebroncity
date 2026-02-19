"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight, Download, Share2, Shield, Users, Warehouse } from "lucide-react"
import Image from "next/image"

export function ChildrensBlock() {
    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left: Interactive Model / Visuals */}
                    <div className="w-full lg:w-1/2 sticky top-24">
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
                                <p className="text-sm text-gray-300">Architectural Render • Phase 2 In Progress</p>
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
                                We are building a sanctuary designed specifically for the next generation. A space that fosters learning, safety, and spiritual growth, equipped with modern facilities to serve our community for decades to come.
                            </p>

                            <div className="flex gap-6 mt-6 text-sm font-medium text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Warehouse className="w-4 h-4" />
                                    <span>Est. Completion: Dec 2026</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>12,000 sq ft</span>
                                </div>
                            </div>
                        </div>

                        {/* Fundraising Card */}
                        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-xl mb-16 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Phase 1 Fundraising Goal</h3>
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-4xl font-display font-bold text-[#65A30D]">$750,000</span>
                                    <span className="text-sm text-gray-500 mb-1.5">raised of $1.2M goal</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden mb-6">
                                    <div className="h-full bg-[#65A30D] w-[62%] rounded-full relative">
                                        <div className="absolute top-0 bottom-0 right-0 w-1 bg-white/30 animate-pulse"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Donors</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">1,240</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Days Left</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">45</p>
                                    </div>
                                </div>

                                <Button className="w-full bg-[#3F6212] hover:bg-[#365314] text-white rounded-full py-6 text-lg font-bold shadow-lg shadow-green-900/20">
                                    Make a Donation <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
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
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-video bg-gray-200 rounded-lg"></div>
                                    <div className="aspect-video bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>

                            {/* Item 2 - Active */}
                            <div className="relative group">
                                <div className="absolute -left-[57px] top-0 w-8 h-8 rounded-full bg-[#65A30D] flex items-center justify-center shadow-lg shadow-green-500/30">
                                    <span className="text-white text-xs font-bold">2</span>
                                </div>
                                <span className="text-[#65A30D] font-bold text-xs uppercase tracking-wider mb-2 block">Phase 2 - In Progress</span>
                                <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
                                    <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">New Classrooms</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Designed for modern learning, the new block features 12 sound-proofed classrooms, adaptable furniture, and integrated AV systems.
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
                                    <a href="#" className="inline-flex items-center text-[#65A30D] font-bold hover:underline text-sm">
                                        View Room Schematics <ChevronRight className="w-4 h-4 ml-1" />
                                    </a>
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
                            <p className="text-gray-500 mb-6">Your contribution today builds the spiritual home for tomorrow's leaders.</p>
                            <div className="flex justify-center gap-4">
                                <Button className="bg-[#3F6212] hover:bg-[#365314] rounded-full px-6">Give Now</Button>
                                <Button variant="outline" className="rounded-full px-6"><Share2 className="w-4 h-4 mr-2" /> Share Project</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
