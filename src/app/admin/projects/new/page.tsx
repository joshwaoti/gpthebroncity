"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NewProjectPage() {
    const router = useRouter();
    const { user } = useUser();
    const createProject = useMutation((api as any).projects.create);
    const [isSaving, setIsSaving] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        status: "active" as "active" | "completed" | "on_hold",
        value: 0,
        goalAmount: 100000,
        date: new Date().toISOString().split("T")[0],
    });

    const set = (k: string, v: any) => setForm((prev) => ({ ...prev, [k]: v }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSaving(true);
        try {
            await createProject({
                name: form.name,
                description: form.description,
                status: form.status,
                value: form.value,
                goalAmount: form.goalAmount,
                date: form.date,
            });
            router.push("/admin/projects");
        } catch (error) {
            console.error("Failed to create project:", error);
            alert("Failed to create project. Check console.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <AdminHeader
                title="Add New Project"
                breadcrumbs={[
                    { label: "Admin", href: "/admin" },
                    { label: "Projects", href: "/admin/projects" },
                    { label: "New Project" }
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
                            <label className="text-sm font-medium text-foreground">Description *</label>
                            <textarea required value={form.description} onChange={e => set("description", e.target.value)} rows={3} placeholder="What is this project funding?" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] resize-y" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5 relative">
                                <label className="text-sm font-medium text-foreground">Fundraising Goal (KES) *</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold">KES</span>
                                    <input required type="number" value={form.goalAmount} onChange={e => set("goalAmount", Number(e.target.value))} className="w-full border border-border rounded-lg pl-12 pr-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Current Amount Raised (KES)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold">KES</span>
                                    <input type="number" value={form.value} onChange={e => set("value", Number(e.target.value))} className="w-full border border-border rounded-lg pl-12 pr-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
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

                        <div className="pt-4 flex gap-3 justify-end border-t border-border mt-6">
                            <Link href="/admin/projects">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" isLoading={isSaving}>Create Project</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
