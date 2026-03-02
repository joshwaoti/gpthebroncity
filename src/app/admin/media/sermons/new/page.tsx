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

export default function NewSermonPage() {
    const router = useRouter();
    const { user } = useUser();
    const createSermon = useMutation(api.sermons.create);
    const [isSaving, setIsSaving] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        speaker: "",
        date: new Date().toISOString().split("T")[0],
        videoUrl: "",
        thumbnailUrl: "",
        category: "Sunday Service",
        isFeatured: false,
    });

    const set = (k: string, v: any) => setForm((prev) => ({ ...prev, [k]: v }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSaving(true);
        try {
            await createSermon({
                ...form,
                createdBy: user.id
            });
            router.push("/admin/media/sermons");
        } catch (error) {
            console.error("Failed to create sermon:", error);
            alert("Failed to create sermon. Check console.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <AdminHeader
                title="Add New Sermon"
                breadcrumbs={[
                    { label: "Admin", href: "/admin" },
                    { label: "Media", href: "/admin/media/sermons" },
                    { label: "Sermons", href: "/admin/media/sermons" },
                    { label: "New" }
                ]}
            />

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <Link href="/admin/media/sermons" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Sermons
                </Link>

                <div className="bg-card border border-border rounded-xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Sermon Title *</label>
                            <input required value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. The Power of Faith" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Preacher / Speaker</label>
                                <input value={form.speaker} onChange={e => set("speaker", e.target.value)} placeholder="e.g. Pastor John Doe" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Date Preached *</label>
                                <input required type="date" value={form.date} onChange={e => set("date", e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Description</label>
                            <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={4} placeholder="Summary of the sermon..." className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] resize-y" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">YouTube Video URL</label>
                                <input value={form.videoUrl} onChange={e => set("videoUrl", e.target.value)} placeholder="https://youtu.be/..." className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Thumbnail Image URL</label>
                                <input value={form.thumbnailUrl} onChange={e => set("thumbnailUrl", e.target.value)} placeholder="https://..." className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Category</label>
                                <select value={form.category} onChange={e => set("category", e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]">
                                    <option value="Sunday Service">Sunday Service</option>
                                    <option value="Midweek Service">Midweek Service</option>
                                    <option value="Youth Service">Youth Service</option>
                                    <option value="Special Event">Special Event</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form.isFeatured} onChange={e => set("isFeatured", e.target.checked)} className="w-4 h-4 accent-[#257300]" />
                                <span className="text-sm font-medium text-foreground">Feature this sermon on homepage</span>
                            </label>
                        </div>

                        <div className="pt-4 flex gap-3 justify-end border-t border-border mt-6">
                            <Link href="/admin/media/sermons">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" isLoading={isSaving}>Publish Sermon</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
