"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Calendar, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/pagination";

export default function EventsPage() {
    const events = useQuery(api.events.list, { status: "all" });
    const removeEvent = useMutation(api.events.remove);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [deleteId, setDeleteId] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const categories = ["Service", "Fellowship", "Worship", "Kids", "Leadership"];

    const filtered = events?.filter(e => {
        const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || (e.location || "").toLowerCase().includes(search.toLowerCase());
        const matchCat = categoryFilter === "all" || e.category === categoryFilter;
        return matchSearch && matchCat;
    }) || [];

    const ITEMS_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    if (currentPage > 1 && paginatedItems.length === 0 && filtered.length > 0) {
        setCurrentPage(1);
    }

    const categoryColors: Record<string, string> = {
        Service: "bg-[#257300]/10 text-[#6EA704]",
        Fellowship: "bg-blue-500/10 text-blue-500",
        Worship: "bg-purple-500/10 text-purple-500",
        Kids: "bg-orange-500/10 text-orange-500",
        Leadership: "bg-[#C8A229]/10 text-[#C8A229]",
    };

    const statusColors: Record<string, string> = {
        published: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        draft: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try { await removeEvent({ id: deleteId }); }
        finally { setIsDeleting(false); setDeleteId(null); }
    };

    return (
        <div>
            <AdminHeader
                title="Events"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Events" }]}
            />
            <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                    </div>
                    <div className="flex gap-2">
                        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#257300]">
                            <option value="all">All Categories</option>
                            {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <Link href="/admin/events/new">
                            <Button className="gap-2 whitespace-nowrap"><Plus className="w-4 h-4" /> New Event</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-3">
                    {!events ? (
                        <div className="text-center py-12 text-muted-foreground">Loading...</div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">No events found</div>
                    ) : (
                        paginatedItems.map(event => (
                            <div key={event?._id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-[#257300]/30 transition-all">
                                <div className="bg-[#257300]/10 rounded-lg p-3 text-center min-w-[56px] flex-shrink-0">
                                    <p className="text-[10px] text-[#6EA704] font-medium uppercase">{new Date(event.date).toLocaleString("en", { month: "short" })}</p>
                                    <p className="text-xl font-bold text-[#257300]">{new Date(event.date).getDate()}</p>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <p className="font-semibold text-foreground">{event.title}</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(event.date).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", categoryColors[event.category ?? "Service"] || "bg-zinc-100 text-zinc-600")}>{event.category}</span>
                                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium hidden sm:inline", statusColors[event.status] || "bg-zinc-100 text-zinc-600")}>{event.status}</span>
                                    <Link href={`/admin/events/${event?._id}`}>
                                        <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                                    </Link>
                                    <button onClick={() => setDeleteId(event?._id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
            <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} isLoading={isDeleting} title="Delete Event" description="This will permanently delete this event." confirmLabel="Delete Event" />
        </div>
    );
}
