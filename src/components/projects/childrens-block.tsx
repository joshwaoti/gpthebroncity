"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, HeartHandshake, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { projectsPage } from "@/data"

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

                        {/* Quick Info Card */}
                        <div className="mt-6 bg-accent dark:bg-white/5 border border-border dark:border-white/10 rounded-2xl p-6">
                            <h4 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-4">Project Details</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="w-5 h-5 text-[#65A30D]" />
                                    <span className="text-gray-600 dark:text-gray-400">Utawala, Buru Farmers Rd</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="w-5 h-5 text-[#65A30D]" />
                                    <span className="text-gray-600 dark:text-gray-400">Groundbreaking: Dec 12, 2023</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <HeartHandshake className="w-5 h-5 text-[#65A30D]" />
                                    <span className="text-gray-600 dark:text-gray-400">Paybill: 552800 | A/C: 200777</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content & Timeline */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-12">
                            <span className="text-[#65A30D] font-bold tracking-widest uppercase text-xs mb-4 block">Project Overview</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                {projectsPage.overview.title}
                            </h2>
                            
                            <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                <p>
                                    {projectsPage.overview.introduction}
                                </p>
                                <p>
                                    {projectsPage.overview.challenge}
                                </p>
                                <p>
                                    {projectsPage.overview.resolution}
                                </p>
                            </div>
                        </div>

                        {/* Why This Project Matters */}
                        <div className="mb-12 bg-gradient-to-br from-[#65A30D]/10 to-[#65A30D]/5 dark:from-[#65A30D]/20 dark:to-[#65A30D]/5 border border-[#65A30D]/20 rounded-3xl p-8">
                            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                <CheckCircle2 className="w-7 h-7 text-[#65A30D]" />
                                Why This Project Matters
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 italic">
                                {projectsPage.overview.vision}
                            </p>
                            <ul className="space-y-4">
                                {projectsPage.overview.whyItMatters.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[#65A30D] flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
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

                        {/* Giving Information */}
                        <div className="mt-16 bg-gradient-to-br from-[#65A30D] to-[#4D7C0F] text-white rounded-3xl p-8 md:p-10 shadow-2xl">
                            <div className="text-center mb-8">
                                <HeartHandshake className="w-12 h-12 mx-auto mb-4 text-white/90" />
                                <h3 className="text-3xl font-display font-bold mb-3">{projectsPage.giving.title}</h3>
                                <p className="text-white/90 text-lg leading-relaxed mb-6">
                                    {projectsPage.giving.description}
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Paybill Number</p>
                                        <p className="text-3xl font-display font-bold">{projectsPage.giving.paybill}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Account Number</p>
                                        <p className="text-3xl font-display font-bold">{projectsPage.giving.accountNumber}</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-white/90 text-sm leading-relaxed italic">
                                {projectsPage.giving.cta}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
