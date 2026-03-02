"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { ShieldAlert, Shield, ShieldCheck, Mail } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AdminPagination } from "@/components/admin/pagination";

export default function UsersAdminPage() {
    const { user } = useUser();
    const allUsers = useQuery((api as any).users.list);
    const updateRole = useMutation((api as any).users.updateRole); // Assume implemented in backend
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const userRole = (user?.publicMetadata?.role as string) || "super_admin";

    // Prevent non-super-admins from seeing the page
    if (userRole !== "super_admin") {
        return (
            <div className="p-10 text-center flex flex-col items-center justify-center min-h-[50vh]">
                <ShieldAlert className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-xl font-bold mb-2">Access Denied</h2>
                <p className="text-muted-foreground">You do not have permission to view or manage users.</p>
            </div>
        );
    }

    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
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

    const handleRoleChange = async (userId: string, newRole: string) => {
        setIsUpdating(userId);
        try {
            await updateRole({ id: userId, role: newRole });
        } catch (error) {
            console.error("Failed to update role:", error);
            alert("Role update failed. Make sure the api.users.updateRole mutation exists in Convex.");
        } finally {
            setIsUpdating(null);
        }
    };

    return (
        <div>
            <AdminHeader
                title="Team & Users"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }, { label: "Users" }]}
            />

            <div className="p-6 space-y-6">
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
                                        <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No users found.</td>
                                    </tr>
                                ) : (
                                    paginatedItems.map((u: any) => (
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
                                                    {u.clerkId === user?.id ? (
                                                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", roleColors[u.role || "super_admin"])}>
                                                            {roleLabels[u.role || "super_admin"]} (You)
                                                        </span>
                                                    ) : (
                                                        <select
                                                            disabled={isUpdating === u._id}
                                                            value={u.role || "user"}
                                                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
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
        </div>
    );
}
