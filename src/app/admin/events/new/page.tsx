"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";

const CATEGORIES = ["Service", "Fellowship", "Worship", "Kids", "Leadership", "Holiday", "Family", "Youth"] as const;

export default function NewEventPage() {
    const router = useRouter();
    const createEvent = useMutation(api.events.create);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        date: "",          // YYYY-MM-DD
        endDate: "",       // YYYY-MM-DD
        startTime: "",     // HH:MM
        endTime: "",       // HH:MM
        location: "",
        category: "Service" as (typeof CATEGORIES)[number],
        description: "",
    });

    const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.date) {
            alert("Title and start date are required.");
            return;
        }
        setIsLoading(true);
        try {
            await createEvent({
                title: form.title,
                description: form.description || undefined,
                date: form.date,                              // already YYYY-MM-DD
                endDate: form.endDate || undefined,
                startTime: form.startTime || undefined,
                endTime: form.endTime || undefined,
                location: form.location || undefined,
                category: form.category,
            });
            router.push("/admin/events");
        } catch (err) {
            console.error(err);
            alert("Failed to create event. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <AdminHeader
                title="New Event"
                breadcrumbs={[
                    { label: "Admin", href: "/admin" },
                    { label: "Events", href: "/admin/events" },
                    { label: "New Event" },
                ]}
            />
            <div className="p-6 max-w-3xl mx-auto space-y-5">
                {/* Basic info */}
                <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                    <h3 className="font-semibold text-foreground">Basic Information</h3>

                    <div>
                        <label className="text-xs text-muted-foreground">Event Title *</label>
                        <input
                            value={form.title}
                            onChange={e => set("title", e.target.value)}
                            placeholder="Event name"
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-muted-foreground">Start Date *</label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={e => set("date", e.target.value)}
                                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">End Date (multi-day)</label>
                            <input
                                type="date"
                                value={form.endDate}
                                onChange={e => set("endDate", e.target.value)}
                                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-muted-foreground">Start Time</label>
                            <input
                                type="time"
                                value={form.startTime}
                                onChange={e => set("startTime", e.target.value)}
                                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">End Time</label>
                            <input
                                type="time"
                                value={form.endTime}
                                onChange={e => set("endTime", e.target.value)}
                                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-muted-foreground">Location</label>
                        <input
                            value={form.location}
                            onChange={e => set("location", e.target.value)}
                            placeholder="e.g. Main Sanctuary, GPT Hebron City"
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-muted-foreground">Category</label>
                        <select
                            value={form.category}
                            onChange={e => set("category", e.target.value)}
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                        >
                            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-muted-foreground">Description</label>
                        <textarea
                            value={form.description}
                            onChange={e => set("description", e.target.value)}
                            placeholder="Brief event description..."
                            rows={4}
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1 resize-none"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => router.back()} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading} className="flex-1 gap-2">
                        <Save className="w-4 h-4" /> {isLoading ? "Creating..." : "Create Event"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
