"use client";

import { useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Play, Search, RefreshCw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/pagination";

export default function SermonsPage() {
    const sermons = useQuery(api.sermons.list, {});
    const removeSermon = useMutation((api as any).sermons.remove);
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const syncSermons = useAction(api.youtube.syncSermons);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const result = await syncSermons();
            if (result.success) {
                alert(`Successfully synced ${result.count} sermons!`);
            } else {
                alert(`Failed to sync: ${result.error}`);
            }
        } catch (e) {
            alert("Error syncing sermons.");
            console.error(e);
        } finally {
            setIsSyncing(false);
        }
    };

    const filtered = sermons?.filter((s: any) => {
        const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || (s.pastor || "").toLowerCase().includes(search.toLowerCase());
        return matchSearch;
    }) || [];

    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedItems = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Reset page on search filter change
    if (currentPage > 1 && paginatedItems.length === 0 && filtered.length > 0) {
        setCurrentPage(1);
    }

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try { await removeSermon({ id: deleteId }); }
        finally { setIsDeleting(false); setDeleteId(null); }
    };

    const typeColors: Record<string, string> = {
        video: "bg-blue-500/10 text-blue-500",
        audio: "bg-purple-500/10 text-purple-500",
        text: "bg-orange-500/10 text-orange-500",
    };

    return (
        <div>
            <AdminHeader
                title="Sermons"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Media" }, { label: "Sermons" }]}
            />
            <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sermons..." className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleSync} disabled={isSyncing} variant="outline" className="gap-2 whitespace-nowrap">
                            <RefreshCw className={cn("w-4 h-4", isSyncing && "animate-spin")} />
                            {isSyncing ? "Syncing..." : "Sync YouTube"}
                        </Button>
                        <Link href="/admin/media/sermons/new">
                            <Button className="gap-2 whitespace-nowrap"><Plus className="w-4 h-4" /> New Sermon</Button>
                        </Link>
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-accent/30">
                                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Sermon</th>
                                <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden sm:table-cell">Pastor</th>
                                <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Date</th>
                                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Type</th>
                                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!sermons ? (
                                <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">Loading...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">No sermons found</td></tr>
                            ) : (
                                paginatedItems.map((sermon: any) => (
                                    <tr key={sermon?._id} className="border-b border-border last:border-0 hover:bg-accent/20 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                {sermon?.thumbnail ? (
                                                    <img src={sermon.thumbnail} alt={sermon.title} className="w-12 h-9 object-cover rounded" />
                                                ) : (
                                                    <div className="w-12 h-9 bg-[#257300]/10 rounded flex items-center justify-center flex-shrink-0"><Play className="w-3 h-3 text-[#6EA704]" /></div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-foreground line-clamp-1">{sermon?.title}</p>
                                                    <p className="text-xs text-muted-foreground">{sermon?.seriesName ?? sermon?.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{sermon.preacher}</td>
                                        <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{new Date(sermon.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</td>
                                        <td className="px-4 py-3">
                                            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", typeColors[sermon.type] || "bg-zinc-100 text-zinc-600")}>{sermon.type || "Video"}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link href={`/admin/media/sermons/${sermon?._id}`}>
                                                    <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                                                </Link>
                                                <button onClick={() => setDeleteId(sermon?._id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
            <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} isLoading={isDeleting} title="Delete Sermon" description="This sermon will be permanently deleted." confirmLabel="Delete Sermon" />
        </div>
    );
}
