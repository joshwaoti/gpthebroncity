"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/pagination";

export default function MinistriesPage() {
    const ministries = useQuery((api as any).content.getAllMinistries) as any[];
    const upsertMinistry = useMutation((api as any).content.upsertMinistry);
    const removeMinistry = useMutation((api as any).content.deleteMinistry);
    const [editing, setEditing] = useState<any>(undefined);
    const [deleteId, setDeleteId] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [form, setForm] = useState({ title: "", description: "", leader: "", schedule: "", image: "", isActive: true, order: 0 });

    const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

    const openNew = () => {
        setEditing(null);
        const nextOrder = (ministries?.length ?? 0) + 1;
        setForm({ title: "", description: "", leader: "", schedule: "", image: "", isActive: true, order: nextOrder });
    };
    const openEdit = (m: any) => {
        setEditing(m?._id);
        setForm({ title: m.title, description: m.description, leader: m.leader, schedule: m.schedule, image: m.image ?? "", isActive: m.isActive, order: m.order });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await upsertMinistry(editing ? { id: editing, ...form } : form);
            setEditing(undefined);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try { await removeMinistry({ id: deleteId }); }
        finally { setIsDeleting(false); setDeleteId(null); }
    };

    const showForm = editing !== undefined;

    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const safeMinistries = ministries ? ministries.filter(Boolean) : [];
    const totalPages = Math.ceil(safeMinistries.length / ITEMS_PER_PAGE);
    const paginatedItems = safeMinistries.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div>
            <AdminHeader
                title="Ministries"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Ministries" }]}
            />
            <div className="p-6 space-y-6">
                {!showForm && (
                    <div className="flex justify-end">
                        <Button onClick={openNew} className="gap-2"><Plus className="w-4 h-4" /> New Ministry</Button>
                    </div>
                )}

                {showForm && (
                    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                        <h3 className="font-semibold text-foreground">{editing ? "Edit Ministry" : "New Ministry"}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-muted-foreground">Ministry Name *</label>
                                <input value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Youth Ministry" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">Leader *</label>
                                <input value={form.leader} onChange={e => set("leader", e.target.value)} placeholder="e.g. Pastor James" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">Description *</label>
                            <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1 resize-none" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-muted-foreground">Schedule</label>
                                <input value={form.schedule} onChange={e => set("schedule", e.target.value)} placeholder="e.g. Fridays at 6:00 PM" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">Image URL</label>
                                <input value={form.image} onChange={e => set("image", e.target.value)} placeholder="https://..." className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form.isActive} onChange={e => set("isActive", e.target.checked)} className="w-4 h-4 accent-[#257300]" />
                                <span className="text-sm text-foreground">Active ministry</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <label className="text-xs text-muted-foreground">Display Order</label>
                                <input type="number" value={form.order} onChange={e => set("order", parseInt(e.target.value) || 0)} className="w-16 border border-border rounded-lg px-2 py-1 text-sm bg-background focus:outline-none" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setEditing(undefined)} className="flex-1">Cancel</Button>
                            <Button onClick={handleSave} isLoading={isSaving} className="flex-1">Save Ministry</Button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {!ministries ? (
                        <p className="text-muted-foreground col-span-3 text-center py-8">Loading...</p>
                    ) : ministries.length === 0 && !showForm ? (
                        <p className="text-muted-foreground col-span-3 text-center py-8">No ministries yet. Click &ldquo;New Ministry&rdquo; to add one.</p>
                    ) : (
                        paginatedItems.map((ministry: any) => (
                            <div key={ministry?._id} className={cn("bg-card border rounded-xl p-4 transition-all", ministry?.isActive ? "border-border" : "border-border opacity-60")}>
                                {ministry?.image && (
                                    <img src={ministry.image} alt={ministry.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                                )}
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div>
                                        <h4 className="font-semibold text-foreground">{ministry?.title}</h4>
                                        <p className="text-xs text-muted-foreground">{ministry?.leader}</p>
                                    </div>
                                    <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0", ministry?.isActive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-500")}>
                                        {ministry?.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{ministry?.description}</p>
                                {ministry?.schedule && (
                                    <div className="flex items-center gap-1 text-xs text-[#6EA704] mb-3">
                                        <Users className="w-3 h-3" />
                                        <span>{ministry.schedule}</span>
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <button onClick={() => openEdit(ministry)} className="flex-1 py-1.5 rounded-lg bg-accent hover:bg-accent/80 text-xs font-medium text-foreground transition-all flex items-center justify-center gap-1.5">
                                        <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                    <button onClick={() => setDeleteId(ministry?._id)} className="py-1.5 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-all">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {!showForm && <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
            </div>
            <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} isLoading={isDeleting} title="Delete Ministry" description="This ministry will be permanently deleted." confirmLabel="Delete Ministry" />
        </div>
    );
}
