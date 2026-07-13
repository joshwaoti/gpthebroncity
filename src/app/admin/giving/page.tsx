"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { Save, CreditCard, Smartphone, Building2, Globe, Plus, Trash2, Edit2, X, Heart } from "lucide-react";

type MethodType = "mobile" | "bank" | "online" | "international";

const typeIcons: Record<MethodType, React.ComponentType<{ className?: string }>> = {
    mobile: Smartphone,
    bank: Building2,
    online: Globe,
    international: Globe,
};

const typeLabels: Record<MethodType, string> = {
    mobile: "Mobile Money (M-Pesa)",
    bank: "Bank Transfer",
    online: "Online / Card",
    international: "International",
};

interface DetailRow { label: string; value: string; }

export default function GivingPage() {
    const methods = useQuery((api as any).content.getAllGivingMethods) as any[];
    const upsertMethod = useMutation((api as any).content.upsertGivingMethod);
    const removeMethod = useMutation((api as any).content.deleteGivingMethod);
    const [editing, setEditing] = useState<any>(undefined);
    const [isSaving, setIsSaving] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [form, setForm] = useState<{
        title: string;
        type: MethodType;
        description: string;
        details: DetailRow[];
        isActive: boolean;
        order: number;
    }>({
        title: "", type: "mobile", description: "", details: [], isActive: true, order: 0,
    });

    const setF = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

    const addDetail = () => setF("details", [...form.details, { label: "", value: "" }]);
    const updateDetail = (i: number, k: "label" | "value", v: string) => {
        const next = form.details.map((d, idx) => idx === i ? { ...d, [k]: v } : d);
        setF("details", next);
    };
    const removeDetail = (i: number) => setF("details", form.details.filter((_, idx) => idx !== i));

    const openNew = () => {
        setEditing(null);
        const nextOrder = (methods?.length ?? 0) + 1;
        setForm({ title: "", type: "mobile", description: "", details: [], isActive: true, order: nextOrder });
    };

    const openEdit = (m: any) => {
        setEditing(m?._id);
        setForm({
            title: m.title,
            type: m.type as MethodType,
            description: m.description,
            details: m.details ?? [],
            isActive: m.isActive,
            order: m.order,
        });
    };

    const handleSave = async () => {
        if (!form.title.trim()) {
            alert("Title is required.");
            return;
        }
        setIsSaving(true);
        try {
            await upsertMethod(editing ? { id: editing, ...form } : form);
            setEditing(undefined);
        } catch (err) {
            console.error("Failed to save giving method:", err);
            alert("Failed to save giving method. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await removeMethod({ id: deleteId });
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const showForm = editing !== undefined;

    return (
        <div>
            <AdminHeader
                title="Giving Methods"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Giving" }]}
            />
            <div className="p-6 space-y-6">
                {!showForm && (
                    <div className="flex justify-end">
                        <Button onClick={openNew} className="gap-2"><Plus className="w-4 h-4" /> Add Giving Method</Button>
                    </div>
                )}

                {showForm && (
                    <div className="bg-card border border-border rounded-xl p-5 space-y-4 max-w-2xl">
                        <h3 className="font-semibold text-foreground">{editing ? "Edit Giving Method" : "New Giving Method"}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-muted-foreground">Title *</label>
                                <input value={form.title} onChange={e => setF("title", e.target.value)} placeholder="e.g. M-Pesa Paybill" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">Type</label>
                                <select value={form.type} onChange={e => setF("type", e.target.value as MethodType)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1">
                                    {(Object.keys(typeLabels) as MethodType[]).map(t => (
                                        <option key={t} value={t}>{typeLabels[t]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">Description (shown on card)</label>
                            <input value={form.description} onChange={e => setF("description", e.target.value)} placeholder="e.g. Give via M-Pesa on your phone" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                        </div>

                        {/* Detail rows */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-xs text-muted-foreground">Step-by-step Details</label>
                                <button onClick={addDetail} className="text-xs text-[#6EA704] hover:underline">+ Add Step</button>
                            </div>
                            <div className="space-y-2">
                                {form.details.map((d, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input value={d.label} onChange={e => updateDetail(i, "label", e.target.value)} placeholder="Label (e.g. Paybill No)" className="flex-1 border border-border rounded-lg px-2 py-1.5 text-xs bg-background focus:outline-none" />
                                        <input value={d.value} onChange={e => updateDetail(i, "value", e.target.value)} placeholder="Value (e.g. 123456)" className="flex-1 border border-border rounded-lg px-2 py-1.5 text-xs bg-background focus:outline-none" />
                                        <button onClick={() => removeDetail(i)} className="text-muted-foreground hover:text-red-500 transition-colors"><X className="w-3.5 h-3.5" /></button>
                                    </div>
                                ))}
                                {form.details.length === 0 && <p className="text-xs text-muted-foreground italic">No steps added yet</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form.isActive} onChange={e => setF("isActive", e.target.checked)} className="w-4 h-4 accent-[#257300]" />
                                <span className="text-sm text-foreground">Show publicly</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <label className="text-xs text-muted-foreground">Order</label>
                                <input type="number" value={form.order} onChange={e => setF("order", parseInt(e.target.value) || 0)} className="w-16 border border-border rounded-lg px-2 py-1 text-sm bg-background focus:outline-none" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setEditing(undefined)} className="flex-1">Cancel</Button>
                            <Button onClick={handleSave} isLoading={isSaving} className="flex-1 gap-2"><Save className="w-4 h-4" /> Save Method</Button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {!methods ? (
                        Array(3).fill(null).map((_, i) => (
                            <div key={i} className="animate-pulse h-40 bg-card border border-border rounded-xl" />
                        ))
                    ) : methods.length === 0 && !showForm ? (
                        <div className="col-span-full bg-card border border-dashed border-border rounded-xl">
                            <EmptyState
                                icon={Heart}
                                title="No giving methods configured"
                                description="Add M-Pesa, bank transfer, or online giving details so members know exactly how to give."
                                actionLabel="Add a giving method"
                                onAction={openNew}
                            />
                        </div>
                    ) : (
                        methods.map((method: any) => {
                            const Icon = typeIcons[method.type as MethodType] ?? CreditCard;
                            return (
                                <div key={method?._id} className={`bg-card border border-border rounded-xl p-4 ${!method.isActive ? "opacity-50" : ""}`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-9 h-9 rounded-lg bg-[#257300]/10 flex items-center justify-center">
                                                <Icon className="w-4 h-4 text-[#6EA704]" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground text-sm">{method.title}</p>
                                                <p className="text-[10px] text-muted-foreground">{typeLabels[method.type as MethodType]}</p>
                                            </div>
                                        </div>
                                        {!method.isActive && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>}
                                    </div>
                                    {method.description && <p className="text-xs text-muted-foreground mb-3">{method.description}</p>}
                                    {method.details && method.details.length > 0 && (
                                        <div className="space-y-1 mb-3">
                                            {method.details.slice(0, 2).map((d: DetailRow, i: number) => (
                                                <div key={i} className="flex justify-between text-xs">
                                                    <span className="text-muted-foreground">{d.label}</span>
                                                    <span className="font-medium text-foreground">{d.value}</span>
                                                </div>
                                            ))}
                                            {method.details.length > 2 && <p className="text-[10px] text-muted-foreground">+{method.details.length - 2} more steps</p>}
                                        </div>
                                    )}
                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(method)} className="flex-1 py-1.5 rounded-lg bg-accent hover:bg-accent/80 text-xs font-medium text-foreground transition-all flex items-center justify-center gap-1.5"><Edit2 className="w-3 h-3" /> Edit</button>
                                        <button onClick={() => setDeleteId(method?._id)} className="py-1.5 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-all"><Trash2 className="w-3 h-3" /></button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <ConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Delete Giving Method"
                description="This giving method will be removed from the site."
                confirmLabel="Delete Method"
                variant="danger"
            />
        </div>
    );
}
