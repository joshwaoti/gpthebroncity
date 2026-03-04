"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

const CATEGORIES = ["Service", "Fellowship", "Worship", "Kids", "Leadership", "Holiday", "Family", "Youth"] as const;

export default function EditEventPage() {
    const params = useParams();
    const id = params.id as Id<"events">;
    const router = useRouter();
    const event = useQuery(api.events.getById, { id });
    const updateEvent = useMutation(api.events.update);
    const removeEvent = useMutation(api.events.remove);

    const [isLoading, setIsLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [form, setForm] = useState({
        title: "",
        date: "",          // YYYY-MM-DD
        endDate: "",       // YYYY-MM-DD
        startTime: "",     // HH:MM
        endTime: "",       // HH:MM
        location: "",
        category: "Service" as (typeof CATEGORIES)[number],
        description: "",
        status: "upcoming" as "upcoming" | "completed" | "cancelled",
    });

    useEffect(() => {
        if (event) {
            setForm({
                title: event.title ?? "",
                date: event.date ?? "",
                endDate: event.endDate ?? "",
                startTime: event.startTime ?? "",
                endTime: event.endTime ?? "",
                location: event.location ?? "",
                category: (event.category as any) ?? "Service",
                description: event.description ?? "",
                status: event.status ?? "upcoming",
            });
        }
    }, [event]);

    const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.date) {
            alert("Title and start date are required.");
            return;
        }
        setIsLoading(true);
        try {
            await updateEvent({
                id,
                title: form.title,
                date: form.date,
                endDate: form.endDate || undefined,
                startTime: form.startTime || undefined,
                endTime: form.endTime || undefined,
                location: form.location || undefined,
                category: form.category,
                description: form.description || undefined,
                status: form.status,
            });
            router.push("/admin/events");
        } catch (err) {
            console.error(err);
            alert("Failed to update event. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await removeEvent({ id });
            router.push("/admin/events");
        } catch (err) {
            console.error(err);
            alert("Failed to delete event.");
        } finally {
            setIsDeleting(false);
        }
    };

    if (event === undefined) {
        return (
            <div>
                <AdminHeader title="Edit Event" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Events", href: "/admin/events" }, { label: "Edit" }]} />
                <div className="p-6 max-w-3xl mx-auto">
                    <div className="animate-pulse space-y-4">
                        {Array(5).fill(null).map((_, i) => <div key={i} className="h-12 bg-card rounded-xl border border-border" />)}
                    </div>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div>
                <AdminHeader title="Event Not Found" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Events", href: "/admin/events" }]} />
                <div className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">This event doesn't exist or may have been deleted.</p>
                    <Button onClick={() => router.push("/admin/events")}>Back to Events</Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AdminHeader
                title="Edit Event"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Events", href: "/admin/events" }, { label: event.title }]}
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
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-muted-foreground">Category</label>
                            <select
                                value={form.category}
                                onChange={e => set("category", e.target.value as any)}
                                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                            >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">Status</label>
                            <select
                                value={form.status}
                                onChange={e => set("status", e.target.value as any)}
                                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">Description</label>
                        <textarea
                            value={form.description}
                            onChange={e => set("description", e.target.value)}
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
                        <Save className="w-4 h-4" /> {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="destructive" onClick={() => setShowDelete(true)} className="gap-2">
                        <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                </div>
            </div>
            <ConfirmDialog
                isOpen={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Delete Event"
                description="This will permanently delete this event. This cannot be undone."
                confirmLabel="Delete Event"
            />
        </div>
    );
}
