"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/admin/stat-card";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, TrendingUp, Target, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/pagination";

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
    const pct = Math.min(100, Math.round((raised / goal) * 100));
    return (
        <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>KES {raised.toLocaleString()} raised</span>
                <span className="font-semibold text-foreground">{pct}%</span>
            </div>
            <div className="h-2 bg-accent rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: pct >= 100 ? "#6EA704" : "#257300" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Goal: KES {goal.toLocaleString()}</p>
        </div>
    );
}

export default function ProjectsPage() {
    const projects = useQuery((api as any).projects.getAllAdmin) as any[];
    const totals = useQuery((api as any).projects.getTotals) as any;
    const removeProject = useMutation((api as any).projects.remove);
    const [deleteId, setDeleteId] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try { await removeProject({ id: deleteId }); }
        finally { setIsDeleting(false); setDeleteId(null); }
    };

    const statusColors: Record<string, string> = {
        active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        paused: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    };

    const ITEMS_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const safeProjects = projects || [];
    const totalPages = Math.ceil(safeProjects.length / ITEMS_PER_PAGE);
    const paginatedItems = safeProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div>
            <AdminHeader
                title="Projects & Fundraising"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Projects" }]}
            />
            <div className="p-6 space-y-6">
                {/* Stats */}
                {totals && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard title="Total Raised" value={`KES ${(totals.totalRaised / 1000000).toFixed(2)}M`} icon={TrendingUp} color="green" />
                        <StatCard title="Overall Goal" value={`KES ${(totals.totalGoal / 1000000).toFixed(2)}M`} icon={Target} color="blue" />
                        <StatCard title="Active Projects" value={totals.projectCount} icon={Heart} color="gold" />
                    </div>
                )}

                {/* Projects list */}
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">All Projects</h3>
                    <Link href="/admin/projects/new">
                        <Button className="gap-2"><Plus className="w-4 h-4" /> New Project</Button>
                    </Link>
                </div>

                <div className="grid gap-4">
                    {!projects ? (
                        <p className="text-center py-8 text-muted-foreground">Loading...</p>
                    ) : projects.length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground">No projects yet</p>
                    ) : (
                        paginatedItems.map((project: any) => (
                            <div key={project?._id} className="bg-card border border-border rounded-xl p-5 hover:border-[#257300]/30 transition-all">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <h4 className="font-semibold text-foreground">{project.name}</h4>
                                            {project.priority && <span className="text-[10px] bg-[#C8A229]/10 text-[#C8A229] px-1.5 py-0.5 rounded-full font-bold">PRIORITY</span>}
                                            <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", statusColors[project.status] || "bg-zinc-100 text-zinc-600")}>{project.status}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                        <Link href={`/admin/projects/${project?._id}`}>
                                            <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                                        </Link>
                                        <button onClick={() => setDeleteId(project?._id)} className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                                <ProgressBar raised={project.raisedAmount ?? project.value ?? 0} goal={project.goalAmount ?? 100} />
                            </div>
                        ))
                    )}
                </div>

                <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
            <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} isLoading={isDeleting} title="Delete Project" description="Deleting a project will also remove all donation records associated with it." confirmLabel="Delete Project" variant="danger" />
        </div>
    );
}
