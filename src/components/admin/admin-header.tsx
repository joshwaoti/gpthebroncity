"use client";

import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface AdminHeaderProps {
    title: string;
    breadcrumbs?: { label: string; href?: string }[];
    action?: React.ReactNode;
}

export function AdminHeader({ title, breadcrumbs, action }: AdminHeaderProps) {
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 flex-shrink-0 pl-14 md:pl-6">
            <div>
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-0.5">
                        {breadcrumbs.map((crumb, i) => (
                            <span key={i} className="flex items-center gap-1">
                                {i > 0 && <span>/</span>}
                                {crumb.href ? (
                                    <Link href={crumb.href} className="hover:text-foreground transition-colors">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-foreground">{crumb.label}</span>
                                )}
                            </span>
                        ))}
                    </nav>
                )}
                <h1 className="text-lg font-bold font-display text-foreground">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
                {action}
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
            </div>
        </header>
    );
}
