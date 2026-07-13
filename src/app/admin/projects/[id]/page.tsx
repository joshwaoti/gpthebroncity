"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { AdminHeader } from "@/components/admin/admin-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as Id<"projects">;

    const project = useQuery(api.projects.getById, { id });
    const updateProject = useMutation(api.projects.update);
    const removeProject = useMutation(api.projects.remove);

    const [isSaving, setIsSaving] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        status: "active" as "active" | "completed" | "on_hold",
        value: 0,
        goalAmount: 0,
        date: "",
    });

    useEffect(() => {
        if (project) {
            setForm({
                name: project.name ?? "",
                description: project.description ?? "",
                status: project.status ?? "active",
                value: project.value ?? 0,
                goalAmount: project.goalAmount ?? 0,
                date: project.date ?? "",
            });
        }
    }, [project]);

    const set = (k: string, v: any) => setForm((prev) => ({ ...prev, [k]: v }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateProject({
                id,
                name: form.name,
                description: form.description || undefined,
                status: form.status,
                value: form.value,
                goalAmount: form.goalAmount || undefined,
                date: form.date || undefined,
            });
            router.push("/admin/projects");
        } catch (error) {
            console.error("Failed to update project:", error);
            alert("Failed to update project. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await removeProject({ id });
            router.push("/admin/projects");
        } finally {
            setIsDeleting(false);
        }
    };

    if (project === undefined) {
        return (
            <div>
                <AdminHeader title="Edit Project" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Projects", href: "/admin/projects" }, { label: "Edit" }]} />
                <div className="p-6 max-w-4xl mx-auto">
                    <div className="animate-pulse space-y-4">
                        {Array(5).fill(null).map((_, i) => <div key={i} className="h-12 bg-card rounded-xl border border-border" />)}
                    </div>
                </div>
            </div>
        );
    }

    if (project === null) {
        return (
            <div>
                <AdminHeader title="Project Not Found" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Projects", href: "/admin/projects" }]} />
                <div className="p-10 text-center">
                    <p className="text-muted-foreground mb-4">This project doesn&rsquo;t exist or may have been deleted.</p>
                    <Button onClick={() => router.push("/admin/projects")}>Back to Projects</Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AdminHeader
                title="Edit Project"
                breadcrumbs={[
                    { label: "Admin", href: "/admin" },
                    { label: "Projects", href: "/admin/projects" },
                    { label: project.name }
                ]}
            />

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <Link href="/admin/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Projects
                </Link>

                <div className="bg-card border border-border rounded-xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Project Name *</label>
                            <input required value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Building Expansion Fund" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Description</label>
                            <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3} placeholder="What is this project funding?" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] resize-y" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Fundraising Goal (KES)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold">KES</span>
                                    <input type="number" min={0} value={form.goalAmount} onChange={e => set("goalAmount", Number(e.target.value))} className="w-full border border-border rounded-lg pl-12 pr-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Amount Raised So Far (KES)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold">KES</span>
                                    <input type="number" min={0} value={form.value} onChange={e => set("value", Number(e.target.value))} className="w-full border border-border rounded-lg pl-12 pr-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Status</label>
                                <select value={form.status} onChange={e => set("status", e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]">
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="on_hold">On Hold</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Start Date</label>
                                <input type="date" value={form.date} onChange={e => set("date", e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3 justify-between border-t border-border mt-6">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setShowDelete(true)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 gap-2"
                            >
                                <Trash2 className="w-4 h-4" /> Delete
                            </Button>
                            <div className="flex gap-3">
                                <Link href="/admin/projects">
                                    <Button type="button" variant="outline">Cancel</Button>
                                </Link>
                                <Button type="submit" isLoading={isSaving}>Save Changes</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <ConfirmDialog
                isOpen={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Delete Project"
                description={`"${project.name}" will be permanently deleted. This cannot be undone.`}
                confirmLabel="Delete Project"
                variant="danger"
            />
        </div>
    );
}
