import Link from "next/link";
import { ArrowLeft, Church, Calendar, BookOpen, Mail } from "lucide-react";

export default function NotFound() {
    const quickLinks = [
        { label: "Home", href: "/", icon: Church },
        { label: "Events", href: "/events", icon: Calendar },
        { label: "Blog", href: "/read", icon: BookOpen },
        { label: "Contact", href: "/connect", icon: Mail },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6 py-20">
            <div className="max-w-lg w-full text-center">
                {/* 404 mark */}
                <div className="relative inline-block mb-6">
                    <p className="font-display text-[7rem] sm:text-[9rem] leading-none font-bold text-[#257300]/10 dark:text-[#6EA704]/10 select-none">
                        404
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-[#257300] flex items-center justify-center shadow-lg shadow-[#257300]/25">
                            <Church className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    This page could not be found
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                    The page you&rsquo;re looking for may have been moved, renamed, or no
                    longer exists. &ldquo;In my Father&rsquo;s house are many rooms&rdquo; &mdash; but
                    this isn&rsquo;t one of them.
                </p>

                {/* Primary action */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#257300] hover:bg-[#1a5000] text-white text-sm font-semibold transition-colors mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Homepage
                </Link>

                {/* Quick links */}
                <div className="border-t border-border pt-8">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                        Or visit one of these
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {quickLinks.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-[#257300]/40 hover:bg-[#257300]/5 transition-all group"
                            >
                                <Icon className="w-5 h-5 text-[#257300] dark:text-[#6EA704]" />
                                <span className="text-xs font-medium text-foreground group-hover:text-[#257300] dark:group-hover:text-[#6EA704] transition-colors">
                                    {label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
