"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/admin/stat-card";
import {
    Video, Calendar, FileText, Mail,
    ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
    const pct = Math.min(100, Math.round((raised / goal) * 100));
    return (
        <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>KES {raised.toLocaleString()}</span>
                <span>{pct}%</span>
            </div>
            <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                <div className="h-full bg-[#257300] rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

export default function AdminDashboardPage() {
    const { user } = useUser();
    const latestSermons = useQuery(api.sermons.getLatest, {});
    const upcomingEvents = useQuery(api.events.getUpcoming, {});
    const activeProjects = useQuery((api as any).projects.getActive, { limit: 3 });
    const latestPosts = useQuery(api.blog.getLatest, { limit: 3 });
    const projectTotals = useQuery((api as any).projects.getTotals);
    const contactCount = useQuery((api as any).contact.getNewCount);
    const auditLog = useQuery(api.auditLog.getAll as any, { limit: 8 }) as any[];

    const roleLabel: Record<string, string> = {
        super_admin: "Super Admin",
        editor: "Editor",
        ministry_leader: "Ministry Leader",
        finance_admin: "Finance Admin",
    };

    const actionColors: Record<string, string> = {
        create: "text-green-500 bg-green-500/10",
        update: "text-blue-500 bg-blue-500/10",
        delete: "text-red-500 bg-red-500/10",
        publish: "text-[#B2CB20] bg-[#B2CB20]/10",
        archive: "text-orange-500 bg-orange-500/10",
        login: "text-purple-500 bg-purple-500/10",
    };

    const userRole = (user?.publicMetadata?.role as string) || "super_admin";

    return (
        <div>
            <AdminHeader
                title="Dashboard"
                breadcrumbs={[{ label: "Admin" }, { label: "Dashboard" }]}
            />

            <div className="p-6 space-y-6">
                {/* Welcome banner */}
                <div className="rounded-xl bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-[#0a1205] dark:to-[#152110] border border-border dark:border-[#257300]/20 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[#257300] dark:text-[#6EA704] text-sm font-medium mb-1">Welcome back 👋</p>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{user?.fullName || "Admin"}</h2>
                            <p className="text-zinc-600 dark:text-white/40 text-sm mt-1">{roleLabel[userRole] ?? "Admin"} · GPT Hebron City</p>
                        </div>
                        <div className="hidden sm:block text-right">
                            <p className="text-zinc-500 dark:text-white/30 text-xs">Today</p>
                            <p className="text-zinc-900 dark:text-white font-semibold">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Sermons"
                        value={latestSermons?.length ?? 0}
                        subtitle="Total recordings"
                        icon={Video}
                        color="green"
                    />
                    <StatCard
                        title="Events"
                        value={upcomingEvents?.length ?? 0}
                        subtitle="Upcoming"
                        icon={Calendar}
                        color="blue"
                    />
                    <StatCard
                        title="Blog Posts"
                        value={latestPosts?.length ?? 0}
                        subtitle="Published articles"
                        icon={FileText}
                        color="gold"
                    />
                    <StatCard
                        title="New Messages"
                        value={contactCount ?? 0}
                        subtitle="Contact submissions"
                        icon={Mail}
                        color="orange"
                    />
                </div>

                {/* Fundraising overview */}
                {projectTotals && (
                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-foreground">Fundraising Overview</h3>
                            <Link href="/admin/projects">
                                <Button variant="ghost" size="sm" className="text-xs gap-1">
                                    View all <ChevronRight className="w-3 h-3" />
                                </Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#257300]">KES {(projectTotals.totalRaised / 1000000).toFixed(1)}M</p>
                                <p className="text-xs text-muted-foreground">Total Raised</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-foreground">KES {(projectTotals.totalGoal / 1000000).toFixed(1)}M</p>
                                <p className="text-xs text-muted-foreground">Total Goal</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-foreground">{projectTotals.projectCount}</p>
                                <p className="text-xs text-muted-foreground">Projects</p>
                            </div>
                        </div>
                        {activeProjects?.filter(Boolean).map((p: any) => (
                            <div key={p?._id} className="mb-3">
                                <p className="text-sm font-medium text-foreground mb-1">{p?.name}</p>
                                <ProgressBar raised={(p as any)?.raisedAmount ?? p?.value ?? 0} goal={(p as any)?.goalAmount ?? 100} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Quick actions + Audit log */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick actions */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "New Blog Post", href: "/admin/content/blog/new", icon: FileText },
                                { label: "New Event", href: "/admin/events/new", icon: Calendar },
                                { label: "New Sermon", href: "/admin/media/sermons/new", icon: Video },
                                { label: "View Messages", href: "/admin/connect", icon: Mail },
                            ].map(({ label, href, icon: Icon }) => (
                                <Link key={href} href={href} className="flex items-center gap-2 p-3 rounded-lg bg-accent hover:bg-accent/80 transition-all group">
                                    <Icon className="w-4 h-4 text-[#257300]" />
                                    <span className="text-sm font-medium text-foreground group-hover:text-[#257300] transition-colors">{label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Audit log */}
                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-foreground">Recent Activity</h3>
                            <Link href="/admin/settings/audit-log">
                                <Button variant="ghost" size="sm" className="text-xs gap-1">
                                    Full log <ChevronRight className="w-3 h-3" />
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {!auditLog || auditLog.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">No activity yet</p>
                            ) : (
                                auditLog.filter(Boolean).slice(0, 6).map((entry) => (
                                    <div key={entry?._id} className="flex items-start gap-3">
                                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md flex-shrink-0 mt-0.5 ${actionColors[entry?.action as any] ?? "text-gray-500 bg-gray-500/10"}`}>
                                            {entry?.action}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs text-foreground font-medium truncate">{entry?.entityType ?? entry?.action}</p>
                                            <p className="text-[10px] text-muted-foreground">{entry?.userName}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Upcoming events */}
                <div className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Upcoming Events</h3>
                        <Link href="/admin/events">
                            <Button variant="ghost" size="sm" className="text-xs gap-1">
                                Manage <ChevronRight className="w-3 h-3" />
                            </Button>
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {!upcomingEvents || upcomingEvents.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No upcoming events</p>
                        ) : (
                            upcomingEvents.filter(Boolean).map(event => (
                                <div key={event?._id} className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
                                    <div className="bg-[#257300]/10 rounded-lg p-2 text-center min-w-[48px]">
                                        <p className="text-xs text-[#6EA704] font-medium">{event?.date ? new Date(event.date).toLocaleString("en", { month: "short" }) : ""}</p>
                                        <p className="text-lg font-bold text-[#257300]">{event?.date ? new Date(event.date).getDate() : ""}</p>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">{event?.title}</p>
                                        <p className="text-xs text-muted-foreground">{event?.location}</p>
                                    </div>
                                    <span className="text-[10px] bg-[#257300]/10 text-[#6EA704] px-2 py-0.5 rounded-full font-medium">
                                        {event?.category}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
