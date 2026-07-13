"use client";

import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/pagination";
import { EmptyState } from "@/components/admin/empty-state";
import { changeAdminUserRole, inviteAdminUser } from "@/actions/invite";
import { Users } from "lucide-react";
import type { Id } from "@/../convex/_generated/dataModel";

export default function UsersAdminPage() {
    const allUsers = useQuery(api.users.list);
    const currentUser = useQuery(api.users.getCurrent);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("user");
    const [inviteStatus, setInviteStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [inviteError, setInviteError] = useState("");

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail) return;
        setInviteStatus("loading");
        const res = await inviteAdminUser(inviteEmail, inviteRole);
        if (res?.success) {
            setInviteStatus("success");
            setTimeout(() => {
                setIsInviteModalOpen(false);
                setInviteStatus("idle");
                setInviteEmail("");
                setInviteRole("user");
            }, 2000);
        } else {
            setInviteStatus("error");
            setInviteError(res?.error || "Failed to send invitation.");
        }
    };

    const safeUsers = allUsers ? allUsers.filter(Boolean) : [];
    const totalPages = Math.ceil(safeUsers.length / ITEMS_PER_PAGE);
    const paginatedItems = safeUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const roleColors: Record<string, string> = {
        super_admin: "text-purple-600 bg-purple-500/10 border-purple-500/20",
        editor: "text-blue-600 bg-blue-500/10 border-blue-500/20",
        ministry_leader: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
        finance_admin: "text-amber-600 bg-amber-500/10 border-amber-500/20",
        user: "text-zinc-600 bg-zinc-500/10 border-zinc-500/20",
    };

    const roleLabels: Record<string, string> = {
        super_admin: "Super Admin",
        editor: "Editor",
        ministry_leader: "Ministry Leader",
        finance_admin: "Finance Admin",
        user: "Regular User",
    };

    const roleCapabilities: Record<string, string> = {
        super_admin: "Full access, including settings, users, roles, and audit history.",
        editor: "Content, blog, sermons, media library, and events.",
        ministry_leader: "Events, registrations, ministries, and contact messages.",
        finance_admin: "Projects, fundraising progress, and giving methods.",
        user: "No admin-panel access.",
    };

    const handleRoleChange = async (userId: Id<"users">, targetClerkId: string, newRole: string) => {
        setIsUpdating(userId);
        try {
            const res = await changeAdminUserRole(userId, targetClerkId, newRole);
            if (!res.success) throw new Error(res.error);
        } catch (error: unknown) {
            console.error("Failed to update role:", error);
            const message = error instanceof Error ? error.message : "Role update failed. Please try again.";
            alert(message.includes("Forbidden") || message.includes("own role")
                ? message
                : "Role update failed. Please try again.");
        } finally {
            setIsUpdating(null);
        }
    };

    return (
        <div>
            <AdminHeader
                title="Team & Users"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }, { label: "Users" }]}
                action={
                    <Button onClick={() => setIsInviteModalOpen(true)} className="bg-[#257300] hover:bg-[#1a5000] text-white h-8 text-xs">
                        <Mail className="w-3.5 h-3.5 mr-2" /> Invite User
                    </Button>
                }
            />

            <div className="p-6 space-y-6">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                    {Object.entries(roleLabels).map(([role, label]) => (
                        <div key={role} className="rounded-xl border border-border bg-card p-4">
                            <span className={cn("inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border", roleColors[role])}>
                                {label}
                            </span>
                            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{roleCapabilities[role]}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-accent/50 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Role / Access Level</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {!allUsers ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Loading users...</td>
                                    </tr>
                                ) : allUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4}>
                                            <EmptyState
                                                icon={Users}
                                                title="No team members yet"
                                                description="Invite staff and volunteers to help manage the site. Each person gets their own role and access level."
                                                actionLabel="Invite your first user"
                                                onAction={() => setIsInviteModalOpen(true)}
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedItems.map((u) => (
                                        <tr key={u._id} className="hover:bg-accent/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {u.imageUrl ? (
                                                        <img src={u.imageUrl} alt={u.name} className="w-8 h-8 rounded-full bg-border" />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-[#257300]/20 flex items-center justify-center text-[#257300] font-bold">
                                                            {u.name?.charAt(0) || "U"}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-foreground">{u.name || "Anonymous User"}</p>
                                                        <p className="text-xs text-muted-foreground font-mono">ID: {u.clerkId.substring(0, 12)}...</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    <span className="truncate max-w-[150px]">{u.email || "No email"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-500">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex flex-col items-end gap-2">
                                                    {u.clerkId === currentUser?.clerkId ? (
                                                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", roleColors[u.role || "user"])}>
                                                            {roleLabels[u.role || "user"]} (You)
                                                        </span>
                                                    ) : (
                                                        <select
                                                            disabled={isUpdating === u._id}
                                                            value={u.role || "user"}
                                                            onChange={(e) => handleRoleChange(u._id, u.clerkId, e.target.value)}
                                                            className={cn(
                                                                "text-xs font-semibold pl-3 pr-8 py-1.5 rounded-full border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#257300]",
                                                                roleColors[u.role || "user"] || roleColors["user"],
                                                                isUpdating === u._id && "opacity-50"
                                                            )}
                                                        >
                                                            {Object.entries(roleLabels).map(([key, label]) => (
                                                                <option key={key} value={key} className="bg-background text-foreground">{label}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>

            {isInviteModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-background border border-border rounded-xl shadow-lg w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h3 className="font-bold text-lg text-foreground">Invite New User</h3>
                            <button onClick={() => setIsInviteModalOpen(false)} className="text-muted-foreground hover:text-foreground text-2xl leading-none">
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleInvite} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-foreground">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#257300]"
                                    placeholder="colleague@church.org"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-foreground">Role</label>
                                <select
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value)}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#257300]"
                                >
                                    {Object.entries(roleLabels).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            {inviteStatus === "error" && (
                                <div className="p-3 rounded-md bg-red-500/10 text-red-500 text-sm border border-red-500/20">
                                    {inviteError}
                                </div>
                            )}

                            {inviteStatus === "success" && (
                                <div className="p-3 rounded-md bg-green-500/10 text-green-500 text-sm border border-green-500/20 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    Invitation sent successfully!
                                </div>
                            )}

                            <div className="pt-4 flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => setIsInviteModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={inviteStatus === "loading" || inviteStatus === "success"} className="bg-[#257300] hover:bg-[#1a5000] text-white">
                                    {inviteStatus === "loading" && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Send Invitation
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
