"use client";

import { motion } from "framer-motion";
import { Facebook, ExternalLink, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const YOUVERSION_PLANS = [
    {
        title: "Becoming a Sent Community",
        url: "https://www.bible.com/reading-plans/65270-becoming-a-sent-community",
        description: "Join us in this journey to understand what it means to be a community focused on God's mission, reaching out and being sent into the world.",
        icon: <BookOpen className="w-6 h-6" />,
        color: "from-blue-500/20 to-indigo-500/20",
        tag: "Ministry Plan"
    },
    {
        title: "Ten Commandments of Marriage",
        url: "https://www.bible.com/reading-plans/64922-ten-commandments-of-marriage-a-10-day-devot",
        description: "A 10-day devotional explores the foundational principles for a thriving God-centered marriage. Strengthen your union through biblical wisdom.",
        icon: <Heart className="w-6 h-6" />,
        color: "from-rose-500/20 to-orange-500/20",
        tag: "Marriage & Family"
    }
];

export function SocialsSection() {
    return (
        <section className="py-24 bg-[#F9F8F6] dark:bg-[#0a0f05] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#257300]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#B2CB20]/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-[2px] bg-gold" />
                        <span className="text-[#257300] dark:text-[#B2CB20] font-bold tracking-widest uppercase text-sm">
                            Connect & Grow
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h2 className="font-display text-4xl md:text-5xl font-medium text-gray-900 dark:text-white max-w-2xl">
                            Stay Plugged into <span className="text-[#257300] dark:text-[#B2CB20]">Our Community</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-md">
                            Follow our social feeds and join our Bible study plans to stay connected throughout the week.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Facebook Embed Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-[#121908] rounded-3xl overflow-hidden shadow-sm border border-border dark:border-white/5 h-[600px] flex flex-col"
                    >
                        <div className="p-6 border-b border-border dark:border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <Facebook className="text-white w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white leading-none">Facebook Feed</h3>
                                    <p className="text-xs text-muted-foreground mt-1">@gpthebroncity</p>
                                </div>
                            </div>
                            <a
                                href="https://facebook.com/gpthebroncity"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-blue-600 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="flex-1 w-full bg-muted/30 relative flex justify-center overflow-hidden">
                            {/* Facebook Iframe Wrapper */}
                            <div className="w-full max-w-[500px] h-full relative">
                                <iframe
                                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fgpthebroncity&tabs=timeline&width=500&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 'none', overflow: 'hidden' }}
                                    scrolling="no"
                                    frameBorder="0"
                                    allowFullScreen={true}
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    className="absolute inset-0"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bible Plans Columns */}
                    {YOUVERSION_PLANS.map((plan, index) => (
                        <motion.div
                            key={plan.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group bg-white dark:bg-[#121908] rounded-3xl overflow-hidden shadow-sm border border-border dark:border-white/5 h-[600px] flex flex-col relative"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="p-8 relative z-10 flex flex-col h-full">
                                <div className="mb-auto">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="px-3 py-1 bg-[#257300]/10 dark:bg-[#B2CB20]/10 text-[#257300] dark:text-[#B2CB20] rounded-full text-xs font-bold uppercase tracking-wider">
                                            {plan.tag}
                                        </span>
                                    </div>

                                    <div className="w-16 h-16 bg-[#257300]/5 dark:bg-[#B2CB20]/5 rounded-2xl flex items-center justify-center text-[#257300] dark:text-[#B2CB20] mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                        {plan.icon}
                                    </div>

                                    <h3 className="text-3xl font-display font-medium text-gray-900 dark:text-white mb-6">
                                        {plan.title}
                                    </h3>

                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <a
                                        href={plan.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full"
                                    >
                                        <Button className="w-full py-6 text-lg group-hover:bg-[#257300] group-hover:text-white transition-all duration-300">
                                            Start Reading Plan
                                            <ExternalLink className="ml-2 w-5 h-5" />
                                        </Button>
                                    </a>

                                    <p className="text-center text-sm text-muted-foreground/60 mt-4">
                                        Available on Bible.com & YouVersion App
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
