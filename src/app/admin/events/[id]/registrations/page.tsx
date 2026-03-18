"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { Download, Copy, X, Search, CheckCircle2, XCircle, Users } from "lucide-react";

function formatDate(ts: number) {
    return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function exportCSV(headers: string[], rows: string[][], filename: string) {
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const lines = [headers.map(escape).join(","), ...rows.map((r) => r.map(escape).join(","))];
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export default function EventRegistrationsPage() {
    const params = useParams();
    const eventId = params.id as Id<"events">;

    const event = useQuery(api.events.getById, { id: eventId });
    const form = useQuery(api.eventRegistrations.getForm, { eventId });
    const registrations = useQuery(api.eventRegistrations.getRegistrations, { eventId });
    const cancelReg = useMutation(api.eventRegistrations.cancelRegistration);

    const [search, setSearch] = useState("");
    const [copied, setCopied] = useState(false);

    const fields = form?.fields ?? [];

    const filtered = useMemo(() => {
        if (!registrations) return [];
        if (!search.trim()) return registrations;
        const q = search.toLowerCase();
        return registrations.filter((reg) => {
            const all = Object.values(reg.data as Record<string, string>).join(" ").toLowerCase();
            return all.includes(q);
        });
    }, [registrations, search]);

    const confirmed = registrations?.filter((r) => r.status === "confirmed").length ?? 0;
    const cancelled = registrations?.filter((r) => r.status === "cancelled").length ?? 0;

    const buildRows = (regs: typeof registrations) =>
        (regs ?? []).map((reg) => [
            formatDate(reg.submittedAt),
            reg.status,
            ...fields.map((f) => String((reg.data as Record<string, string>)[f.id] ?? "")),
        ]);

    const headers = ["Submitted At", "Status", ...fields.map((f) => f.label)];

    const handleCopy = () => {
        const rows = buildRows(filtered);
        const tsv = [headers.join("\t"), ...rows.map((r) => r.join("\t"))].join("\n");
        navigator.clipboard.writeText(tsv).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleDownload = () => {
        const rows = buildRows(filtered);
        exportCSV(headers, rows, `registrations-${eventId}.csv`);
    };

    if (!event || !registrations) {
        return (
            <div>
                <AdminHeader
                    title="Registrations"
                    breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Events", href: "/admin/events" }, { label: "Registrations" }]}
                />
                <div className="p-6 max-w-5xl mx-auto animate-pulse space-y-4">
                    {Array(3).fill(null).map((_, i) => <div key={i} className="h-12 rounded-xl border border-border bg-card" />)}
                </div>
            </div>
        );
    }

    return (
        <div>
            <AdminHeader
                title={`Registrations · ${event.title}`}
                breadcrumbs={[
                    { label: "Admin", href: "/admin" },
                    { label: "Events", href: "/admin/events" },
                    { label: event.title, href: `/admin/events/${eventId}` },
                    { label: "Registrations" },
                ]}
            />

            <div className="p-6 max-w-5xl mx-auto space-y-5">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: "Total", value: registrations.length, icon: Users, color: "text-foreground" },
                        { label: "Confirmed", value: confirmed, icon: CheckCircle2, color: "text-green-600" },
                        { label: "Cancelled", value: cancelled, icon: XCircle, color: "text-destructive" },
                    ].map(({ label, value, icon: Icon, color }) => (
                        <div key={label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${color}`} />
                            <div>
                                <p className="text-2xl font-bold text-foreground">{value}</p>
                                <p className="text-xs text-muted-foreground">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search registrations…"
                            className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                            <Copy className="w-4 h-4" />
                            {copied ? "Copied!" : "Copy All"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
                            <Download className="w-4 h-4" /> Download CSV
                        </Button>
                    </div>
                </div>

                {/* Table */}
                {registrations.length === 0 ? (
                    <div className="rounded-xl border border-border bg-card p-12 text-center">
                        <Users className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                        <p className="text-muted-foreground">No registrations yet.</p>
                        {!form?.enabled && (
                            <p className="text-xs text-muted-foreground mt-1">
                                Registration is currently disabled for this event.
                            </p>
                        )}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground text-sm">
                        No registrations match your search.
                    </div>
                ) : (
                    <div className="rounded-xl border border-border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/40 border-b border-border">
                                    <tr>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">Submitted</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">Status</th>
                                        {fields.map((f) => (
                                            <th key={f.id} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">
                                                {f.label}
                                            </th>
                                        ))}
                                        <th className="px-4 py-3" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filtered.map((reg) => (
                                        <tr key={reg._id} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                                                {formatDate(reg.submittedAt)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                                                    reg.status === "confirmed"
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                }`}>
                                                    {reg.status === "confirmed" ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                    {reg.status}
                                                </span>
                                            </td>
                                            {fields.map((f) => (
                                                <td key={f.id} className="px-4 py-3 text-sm text-foreground max-w-[200px] truncate">
                                                    {String((reg.data as Record<string, string>)[f.id] ?? "—")}
                                                </td>
                                            ))}
                                            <td className="px-4 py-3">
                                                {reg.status === "confirmed" && (
                                                    <button
                                                        onClick={() => cancelReg({ registrationId: reg._id })}
                                                        className="text-muted-foreground hover:text-destructive transition-colors"
                                                        title="Cancel registration"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
