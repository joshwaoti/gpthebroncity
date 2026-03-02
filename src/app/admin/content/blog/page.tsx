"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Eye, Search, Filter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BlogListPage() {
    const posts = useQuery(api.blog.list);
    const removePost = useMutation(api.blog.remove);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [deleteId, setDeleteId] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const filtered = posts?.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            (p.author || "").toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || p.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const statusColors: Record<string, string> = {
        published: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        draft: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        archived: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await removePost({ id: deleteId });
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    return (
        <div>
            <AdminHeader
                title="Blog Posts"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Blog" }]}
            />
            <div className="p-6">
                {/* Actions bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search posts..."
                            className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#257300]"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#257300]"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>
                        <Link href="/admin/content/blog/new">
                            <Button className="gap-2 whitespace-nowrap">
                                <Plus className="w-4 h-4" /> New Post
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-accent/30">
                                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Title</th>
                                <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Author</th>
                                <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden sm:table-cell">Category</th>
                                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Status</th>
                                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!filtered ? (
                                <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">Loading...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">No posts found</td></tr>
                            ) : (
                                filtered.map(post => (
                                    <tr key={post?._id} className="border-b border-border last:border-0 hover:bg-accent/20 transition-colors">
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                                                <p className="text-xs text-muted-foreground">{new Date(post._creationTime).toLocaleDateString()}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{post.author}</td>
                                        <td className="px-4 py-3 hidden sm:table-cell">
                                            <span className="text-xs bg-[#257300]/10 text-[#6EA704] px-2 py-0.5 rounded-full">General</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", statusColors[post.status])}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link href={`/read/${post.slug}`} target="_blank">
                                                    <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-all" title="Preview">
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </button>
                                                </Link>
                                                <Link href={`/admin/content/blog/${post?._id}`}>
                                                    <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-all" title="Edit">
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteId(post?._id)}
                                                    className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-500 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Delete Blog Post"
                description="This action cannot be undone. The post will be permanently deleted."
                confirmLabel="Delete Post"
            />
        </div>
    );
}
