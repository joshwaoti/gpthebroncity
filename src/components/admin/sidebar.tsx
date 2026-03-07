"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard, FileText, Video, Calendar, FolderOpen, Heart,
    Church, Mail, Settings, ChevronLeft, ChevronRight,
    BookOpen, Globe, ClipboardList, LogOut, Menu
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useClerk } from "@clerk/nextjs";

interface NavItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    roles?: string[];
    subItems?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    {
        label: "Content", href: "/admin/content", icon: Globe,
        roles: ["super_admin", "editor"],
        subItems: [
            { label: "Homepage", href: "/admin/content/homepage" },
            { label: "About Us", href: "/admin/content/about" },
            { label: "Blog Posts", href: "/admin/content/blog" },
        ]
    },
    {
        label: "Media", href: "/admin/media", icon: Video,
        roles: ["super_admin", "editor"],
        subItems: [
            { label: "Sermons", href: "/admin/media/sermons" },
            { label: "Media Library", href: "/admin/media/library" },
        ]
    },
    { label: "Events", href: "/admin/events", icon: Calendar, roles: ["super_admin", "editor", "ministry_leader"] },
    { label: "Projects", href: "/admin/projects", icon: FolderOpen, roles: ["super_admin", "finance_admin"] },
    { label: "Giving", href: "/admin/giving", icon: Heart, roles: ["super_admin", "finance_admin"] },
    { label: "Ministries", href: "/admin/ministries", icon: Church, roles: ["super_admin", "ministry_leader"] },
    { label: "Connect", href: "/admin/connect", icon: Mail },
    {
        label: "Settings", href: "/admin/settings", icon: Settings,
        roles: ["super_admin"],
        subItems: [
            { label: "General", href: "/admin/settings" },
            { label: "Users & Roles", href: "/admin/settings/users" },
            { label: "Audit Log", href: "/admin/settings/audit-log" },
        ]
    },
];

interface AdminSidebarProps {
    userRole: string;
    userName: string;
    userEmail: string;
}

export function AdminSidebar({ userRole, userName, userEmail }: AdminSidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]); // Default collapsed
    const { signOut } = useClerk();
    const contactCount = useQuery(api.contact.getNewCount);

    const filteredNav = navItems.filter(item =>
        !item.roles || item.roles.includes(userRole)
    );

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    const toggleExpand = (href: string) => {
        setExpandedItems(prev =>
            prev.includes(href) ? prev.filter(h => h !== href) : [...prev, href]
        );
    };

    const roleLabels: Record<string, string> = {
        super_admin: "Super Admin",
        editor: "Editor",
        ministry_leader: "Ministry Leader",
        finance_admin: "Finance Admin",
    };

    return (
        <>
            {/* Mobile Header Toggle Overlay (Optional but good for clicking outside) */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Menu Button - Visible only on small screens */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden fixed top-2 left-3 z-[60] p-1.5 bg-background border border-border rounded-md text-foreground shadow-sm"
            >
                <Menu className="w-5 h-5" />
            </button>

            <aside className={cn(
                "h-screen flex flex-col transition-all duration-300 z-50",
                "bg-white dark:bg-[#0a1205] border-r border-border shadow-sm dark:shadow-none",
                "fixed md:sticky top-0 left-0", // Fixed on mobile, sticky on desktop
                mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                collapsed ? "w-[68px]" : "w-[240px]"
            )}>
                {/* Logo */}
                <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-border/50 dark:border-border/10", collapsed && "justify-center px-2")}>
                    <div className="w-8 h-8 rounded-lg bg-[#257300] flex items-center justify-center flex-shrink-0">
                        <Church className="w-4 h-4 text-white" />
                    </div>
                    {!collapsed && (
                        <div>
                            <p className="text-zinc-900 dark:text-white text-xs font-bold tracking-wide leading-tight">GPT Hebron City</p>
                            <p className="text-[#257300] dark:text-[#6EA704] text-[10px] font-medium">Admin Portal</p>
                        </div>
                    )}
                </div>

                {/* Collapse toggle (Desktop only) */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hidden md:flex absolute -right-3 top-16 w-6 h-6 bg-white dark:bg-[#1a2a0f] border border-border rounded-full items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors z-10 shadow-sm"
                >
                    {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
                </button>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-0.5 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {filteredNav.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        const expanded = expandedItems.includes(item.href);
                        const badge = item.label === "Connect" ? contactCount : undefined;

                        if (item.subItems && !collapsed) {
                            return (
                                <div key={item.href}>
                                    <button
                                        onClick={() => toggleExpand(item.href)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer",
                                            active
                                                ? "bg-[#257300]/10 dark:bg-[#257300]/20 text-[#257300] dark:text-[#6EA704]"
                                                : "text-zinc-500 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                                        )}
                                    >
                                        <Icon className="w-4 h-4 flex-shrink-0" />
                                        <span className="flex-1 text-left">{item.label}</span>
                                        <ChevronRight className={cn("w-3 h-3 transition-transform", expanded && "rotate-90")} />
                                    </button>
                                    {expanded && (
                                        <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border/10 pl-3">
                                            {item.subItems.map(sub => (
                                                <Link
                                                    key={sub.href}
                                                    href={sub.href}
                                                    onClick={() => setMobileOpen(false)} // Close on mobile click
                                                    className={cn(
                                                        "block py-2 px-2 rounded-md text-xs font-medium transition-all",
                                                        pathname === sub.href
                                                            ? "text-[#257300] dark:text-[#B2CB20] bg-[#257300]/10"
                                                            : "text-zinc-500 dark:text-white/40 hover:text-zinc-900 dark:hover:text-white/70"
                                                    )}
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)} // Close on mobile click
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative",
                                    collapsed && "justify-center px-2",
                                    active
                                        ? "bg-[#257300]/10 dark:bg-[#257300]/20 text-[#257300] dark:text-[#6EA704]"
                                        : "text-zinc-500 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                                )}
                                title={collapsed ? item.label : undefined}
                            >
                                <Icon className="w-4 h-4 flex-shrink-0" />
                                {!collapsed && <span className="flex-1">{item.label}</span>}
                                {badge !== undefined && badge > 0 && (
                                    <span className={cn(
                                        "bg-[#257300] text-white text-[10px] font-bold rounded-full flex items-center justify-center",
                                        collapsed ? "absolute -top-1 -right-1 w-4 h-4" : "w-5 h-5"
                                    )}>
                                        {badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User info + logout */}
                <div className={cn("border-t border-border/50 dark:border-border/10 p-3", collapsed && "px-2")}>
                    {!collapsed && (
                        <div className="px-1 mb-2">
                            <p className="text-zinc-900 dark:text-white text-xs font-semibold truncate">{userName}</p>
                            <p className="text-zinc-500 dark:text-white/30 text-[10px] truncate">{roleLabels[userRole] ?? userRole}</p>
                        </div>
                    )}
                    <button
                        onClick={() => signOut()}
                        className={cn(
                            "flex items-center gap-3 text-zinc-600 dark:text-white/40 hover:text-red-600 dark:hover:text-red-400 transition-colors text-sm py-2 px-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 w-full",
                            collapsed && "justify-center"
                        )}
                        title="Sign out"
                    >
                        <LogOut className="w-4 h-4" />
                        {!collapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
