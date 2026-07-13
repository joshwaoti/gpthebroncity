"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { AdminHeader } from "@/components/admin/admin-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Calendar, MapPin, Search, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/pagination";

export default function EventsPage() {
    // Fetch all events (no status filter) for admin view
    const events = useQuery(api.events.list, {});
    const removeEvent = useMutation(api.events.remove);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [deleteId, setDeleteId] = useState<Id<"events"> | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const categories = ["Service", "Fellowship", "Worship", "Kids", "Leadership", "Holiday", "Family", "Youth"];

    const filtered = (events ?? []).filter(e => {
        const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
            (e.location ?? "").toLowerCase().includes(search.toLowerCase());
        const matchCat = categoryFilter === "all" || e.category === categoryFilter;
        const matchStatus = statusFilter === "all" || e.status === statusFilter;
        return matchSearch && matchCat && matchStatus;
    });

    const ITEMS_PER_PAGE = 10;
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedItems = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const categoryColors: Record<string, string> = {
        Service: "bg-green-500/10 text-green-600 dark:text-green-400",
        Fellowship: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        Worship: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
        Kids: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
        Leadership: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
        Holiday: "bg-red-500/10 text-red-600 dark:text-red-400",
        Family: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
        Youth: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    };

    const statusIcons: Record<string, JSX.Element> = {
        upcoming: <Clock className="w-3 h-3" />,
        completed: <CheckCircle className="w-3 h-3" />,
        cancelled: <XCircle className="w-3 h-3" />,
    };
    const statusStyles: Record<string, string> = {
        upcoming: "bg-[#257300]/10 text-[#257300] dark:text-[#B2CB20]",
        completed: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
        cancelled: "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400",
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try { await removeEvent({ id: deleteId }); }
        finally { setIsDeleting(false); setDeleteId(null); }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div>
            <AdminHeader
                title="Events"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Events" }]}
            />
            <div className="p-6">
                {/* Summary stats */}
                {events && (
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                            { label: "Total", count: events.length, color: "text-foreground" },
                            { label: "Upcoming", count: events.filter(e => e.date >= today && e.status === "upcoming").length, color: "text-[#257300]" },
                            { label: "Completed", count: events.filter(e => e.status === "completed" || e.date < today).length, color: "text-gray-500" },
                        ].map(stat => (
                            <div key={stat.label} className="bg-card border border-border rounded-xl p-3 text-center">
                                <p className={cn("text-2xl font-bold", stat.color)}>{stat.count}</p>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Filters row */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                            placeholder="Search events..."
                            className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#257300]"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={categoryFilter}
                            onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                            className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#257300]"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <select
                            value={statusFilter}
                            onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                            className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#257300]"
                        >
                            <option value="all">All Status</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <Link href="/admin/events/new">
                            <Button className="gap-2 whitespace-nowrap"><Plus className="w-4 h-4" /> New Event</Button>
                        </Link>
                    </div>
                </div>

                {/* Event list */}
                <div className="grid gap-2">
                    {events === undefined ? (
                        // Loading skeleton
                        Array(5).fill(null).map((_, i) => (
                            <div key={i} className="animate-pulse h-[72px] bg-card border border-border rounded-xl" />
                        ))
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground">
                            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-40" />
                            <p className="font-medium">No events found</p>
                            <p className="text-sm">Try adjusting your filters or create a new event.</p>
                        </div>
                    ) : (
                        paginatedItems.map(event => (
                            <Link
                                key={event._id}
                                href={`/admin/events/${event._id}`}
                                className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-[#257300]/40 active:bg-accent/40 transition-all group cursor-pointer"
                            >
                                {/* Date block */}
                                <div className="bg-[#257300]/10 rounded-lg p-2.5 text-center min-w-[52px] flex-shrink-0">
                                    <p className="text-[10px] text-[#6EA704] font-bold uppercase">
                                        {new Date(event.date + "T00:00:00").toLocaleString("en", { month: "short" })}
                                    </p>
                                    <p className="text-xl font-bold text-[#257300]">
                                        {new Date(event.date + "T00:00:00").getDate()}
                                    </p>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-foreground truncate">{event.title}</p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap mt-0.5">
                                        {event.location && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />{event.location}
                                            </span>
                                        )}
                                        {event.endDate && (
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />until {event.endDate}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Badges + actions */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", categoryColors[event.category ?? "Service"] ?? "bg-zinc-100 text-zinc-600")}>
                                        {event.category}
                                    </span>
                                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium hidden sm:flex items-center gap-1", statusStyles[event.status])}>
                                        {statusIcons[event.status]}{event.status}
                                    </span>
                                    {event.requiresRegistration && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#B2CB20]/15 text-[#6EA704] hidden md:inline">
                                            Registration on
                                        </span>
                                    )}
                                    <span className="p-1.5 rounded-md hover:bg-accent text-muted-foreground group-hover:text-foreground transition-all">
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </span>
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDeleteId(event._id); }}
                                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-all"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
            <ConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Delete Event"
                description="This will permanently delete this event. This action cannot be undone."
                confirmLabel="Delete Event"
            />
        </div>
    );
}
