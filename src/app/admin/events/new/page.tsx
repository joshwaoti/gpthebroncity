"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, X } from "lucide-react";

import { useUser } from "@clerk/nextjs";

const categories = ["Service", "Fellowship", "Worship", "Kids", "Leadership"] as const;

export default function NewEventPage() {
    const { user } = useUser();
    const router = useRouter();
    const createEvent = useMutation(api.events.create);
    const [isLoading, setIsLoading] = useState(false);
    const [detail, setDetail] = useState("");
    const [form, setForm] = useState({
        title: "",
        date: "",
        endTime: "",
        location: "",
        category: "Service" as (typeof categories)[number],
        slug: "",
        featured: false,
        image: "",
        description: "",
        details: [] as string[],
        organizer: "",
        contact: "",
        registrationLink: "",
        isRecurring: false,
        recurringPattern: "",
        status: "published" as "published" | "draft" | "cancelled",
    });

    const set = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }));
    const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const addDetail = () => {
        if (detail.trim()) {
            set("details", [...form.details, detail.trim()]);
            setDetail("");
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await createEvent({
                title: form.title,
                description: form.description,
                date: new Date(form.date).toISOString(),
                location: form.location,
                imageUrl: form.image,
                category: form.category,
                createdBy: user?.id || "unknown",
            });
            router.push("/admin/events");
        } catch (err) { console.error(err); }
        finally { setIsLoading(false); }
    };

    return (
        <div>
            <AdminHeader
                title="New Event"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Events", href: "/admin/events" }, { label: "New Event" }]}
            />
            <div className="p-6 max-w-3xl mx-auto space-y-5">
                {/* Basic info */}
                <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                    <h3 className="font-semibold text-foreground">Basic Information</h3>
                    <div>
                        <label className="text-xs text-muted-foreground">Event Title *</label>
                        <input value={form.title} onChange={e => { set("title", e.target.value); set("slug", generateSlug(e.target.value)); }} placeholder="Event name" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-muted-foreground">Start Date & Time *</label>
                            <input type="datetime-local" value={form.date} onChange={e => set("date", e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">End Time</label>
                            <input type="datetime-local" value={form.endTime} onChange={e => set("endTime", e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">Location *</label>
                        <input value={form.location} onChange={e => set("location", e.target.value)} placeholder="e.g. Main Sanctuary, GPT Hebron City" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-muted-foreground">Category</label>
                            <select value={form.category} onChange={e => set("category", e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1">
                                {categories.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">Status</label>
                            <select value={form.status} onChange={e => set("status", e.target.value)} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1">
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">Description *</label>
                        <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Brief event description..." rows={3} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1 resize-none" />
                    </div>
                </div>

                {/* Details bullets */}
                <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                    <h3 className="font-semibold text-foreground">Event Details</h3>
                    <p className="text-xs text-muted-foreground">Add bullet points (e.g. schedule, what's included, requirements)</p>
                    <div className="flex gap-2">
                        <input value={detail} onChange={e => setDetail(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addDetail(); } }} placeholder="Add a detail bullet point..." className="flex-1 border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                        <Button onClick={addDetail} size="icon" variant="outline"><Plus className="w-4 h-4" /></Button>
                    </div>
                    {form.details.length > 0 && (
                        <ul className="space-y-1.5">
                            {form.details.map((d, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-foreground bg-accent rounded-lg px-3 py-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#257300] flex-shrink-0" />
                                    <span className="flex-1">{d}</span>
                                    <button onClick={() => set("details", form.details.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-red-500 transition-colors"><X className="w-3.5 h-3.5" /></button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Organizer & options */}
                <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                    <h3 className="font-semibold text-foreground">Additional Info</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-muted-foreground">Organizer *</label>
                            <input value={form.organizer} onChange={e => set("organizer", e.target.value)} placeholder="e.g. Youth Ministry" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">Contact</label>
                            <input value={form.contact} onChange={e => set("contact", e.target.value)} placeholder="+254 712 345 678" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">Registration Link</label>
                        <input value={form.registrationLink} onChange={e => set("registrationLink", e.target.value)} placeholder="https://..." className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">Slug (URL)</label>
                        <input value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="event-url-slug" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1 font-mono" />
                    </div>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)} className="w-4 h-4 accent-[#257300]" />
                            <span className="text-sm text-foreground">Featured event</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={form.isRecurring} onChange={e => set("isRecurring", e.target.checked)} className="w-4 h-4 accent-[#257300]" />
                            <span className="text-sm text-foreground">Recurring</span>
                        </label>
                    </div>
                    {form.isRecurring && (
                        <input value={form.recurringPattern} onChange={e => set("recurringPattern", e.target.value)} placeholder="e.g. Every Sunday" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => router.back()} className="gap-2"><ArrowLeft className="w-4 h-4" /> Cancel</Button>
                    <Button onClick={handleSubmit} isLoading={isLoading} className="flex-1 gap-2"><Save className="w-4 h-4" /> Create Event</Button>
                </div>
            </div>
        </div>
    );
}
