"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Clock, MousePointerClick, ShieldAlert, FileText, Settings, UserPlus, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AdminPagination } from "@/components/admin/pagination";
import { EmptyState } from "@/components/admin/empty-state";
import type { LucideIcon } from "lucide-react";

export default function AuditLogPage() {
    const rawLogs = useQuery(api.auditLog.getAll, { limit: 200 });
    const isLoading = rawLogs === undefined;
    const logs = rawLogs ?? [];

    const ITEMS_PER_PAGE = 15;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(logs.length / ITEMS_PER_PAGE);
    const paginatedItems = logs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const actionColors: Record<string, string> = {
        create: "text-green-600 bg-green-500/10 border-green-500/20",
        update: "text-blue-600 bg-blue-500/10 border-blue-500/20",
        delete: "text-red-600 bg-red-500/10 border-red-500/20",
        login: "text-purple-600 bg-purple-500/10 border-purple-500/20",
        logout: "text-purple-600 bg-purple-500/10 border-purple-500/20",
        view: "text-zinc-600 bg-zinc-500/10 border-zinc-500/20",
        invite: "text-cyan-600 bg-cyan-500/10 border-cyan-500/20",
        sync: "text-indigo-600 bg-indigo-500/10 border-indigo-500/20",
        status_change: "text-amber-600 bg-amber-500/10 border-amber-500/20",
        publish: "text-[#257300] bg-[#257300]/10 border-[#257300]/20",
        default: "text-zinc-600 bg-zinc-500/10 border-zinc-500/20"
    };

    const actionIcons: Record<string, LucideIcon> = {
        create: FileText,
        update: Settings,
        delete: ShieldAlert,
        login: UserPlus,
        logout: UserPlus,
        invite: UserPlus,
        sync: Settings,
        status_change: Settings,
        view: MousePointerClick,
        default: MousePointerClick
    };

    return (
        <div>
            <AdminHeader
                title="System Audit Log"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }, { label: "Audit Log" }]}
            />

            <div className="p-6 space-y-6">
                <div className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-foreground">Activity History</h2>
                            <p className="text-sm text-muted-foreground">Comprehensive log of administrative actions taken across the platform.</p>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="animate-pulse space-y-3">
                            {Array(5).fill(null).map((_, i) => <div key={i} className="h-16 bg-accent/40 rounded-xl" />)}
                        </div>
                    ) : logs.length === 0 ? (
                        <EmptyState
                            icon={ScrollText}
                            title="No activity recorded yet"
                            description="Every create, update, and delete performed in the admin portal will be logged here automatically."
                        />
                    ) : (
                    <div className="space-y-4">
                        {paginatedItems.map((log) => {
                            const Icon = actionIcons[log.action] || actionIcons.default;
                            return (
                                <div key={log._id} className="flex gap-4 p-4 rounded-xl border border-border hover:border-border/80 bg-background/50 hover:bg-accent/50 transition-colors">
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border",
                                        actionColors[log.action] || actionColors.default
                                    )}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex sm:items-center flex-col sm:flex-row justify-between gap-1 sm:gap-4 mb-1">
                                            <p className="text-sm font-semibold text-foreground">
                                                {log.userName || "Unknown User"}
                                                <span className="font-normal text-muted-foreground ml-1">performed</span> {" "}
                                                <span className="capitalize">{log.action}</span>
                                                <span className="font-normal text-muted-foreground ml-1">on</span> {" "}
                                                {log.entityType}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0">
                                                <Clock className="w-3.5 h-3.5" />
                                                {new Date(log.timestamp).toLocaleString()}
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {[log.actorRole?.replaceAll("_", " "), log.userEmail, log.entityId && `ID: ${log.entityId}`]
                                                .filter(Boolean)
                                                .join(" · ")}
                                        </p>
                                        {log.details && (
                                            <p className="text-sm text-foreground/80 bg-accent/30 p-2.5 rounded-lg border border-border/50 mt-2">
                                                {log.details}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    )}
                </div>

                <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
}
