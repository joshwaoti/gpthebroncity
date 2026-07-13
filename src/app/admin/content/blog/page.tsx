"use client";

import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    Eye,
    ChevronRight,
    FileText,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/admin/empty-state";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import Link from "next/link";
import { useState } from "react";

export default function BlogAdminPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const { results, status, loadMore } = usePaginatedQuery(
        api.blog.listPaginated,
        {},
        { initialNumItems: 10 }
    );
    const isLoading = status === "LoadingFirstPage";
    const isLoadingMore = status === "LoadingMore";
    const isDone = status === "Exhausted";

    const removeBlog = useMutation(api.blog.remove);
    const [deleteId, setDeleteId] = useState<Id<"blogPosts"> | null>(null);
    const [deleteTitle, setDeleteTitle] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const filteredBlogs = results.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await removeBlog({ id: deleteId });
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>Manage your blog posts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-4 gap-3">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Link href="/admin/content/blog/new">
                            <Button className="gap-2 whitespace-nowrap">
                                <Plus className="w-4 h-4" /> New Post
                            </Button>
                        </Link>
                    </div>

                    {!isLoading && results.length === 0 ? (
                        <EmptyState
                            icon={FileText}
                            title="No blog posts yet"
                            description="Share teachings, testimonies, and church news with your community by writing your first post."
                            actionLabel="Write your first post"
                            actionHref="/admin/content/blog/new"
                        />
                    ) : !isLoading && filteredBlogs.length === 0 ? (
                        <EmptyState
                            icon={Search}
                            title="No posts match your search"
                            description={`Nothing found for "${searchTerm}". Try a different title or author name.`}
                        />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-[60px]" /></TableCell>
                                            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    filteredBlogs.map((blog) => (
                                        <TableRow key={blog._id}>
                                            <TableCell className="font-medium">
                                                {blog.title}
                                            </TableCell>
                                            <TableCell>{blog.author}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{blog.category || "General"}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={blog.status === "published" ? "default" : "secondary"}
                                                    className={blog.status === "published" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                                                >
                                                    {blog.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{blog.publishDate || new Date(blog._creationTime).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/read/${blog.slug}`} className="flex items-center">
                                                                <Eye className="mr-2 h-4 w-4" /> View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/content/blog/${blog._id}`} className="flex items-center">
                                                                <Pencil className="mr-2 h-4 w-4" /> Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => { setDeleteId(blog._id); setDeleteTitle(blog.title); }}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}

                    {results.length > 0 && !isDone && (
                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="text-sm text-muted-foreground">
                                Showing {results.length} posts
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => loadMore(10)}
                                    disabled={isLoadingMore}
                                >
                                    {isLoadingMore ? "Loading..." : "Load More"}
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <ConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Delete Blog Post"
                description={`"${deleteTitle}" will be permanently deleted. This cannot be undone.`}
                confirmLabel="Delete Post"
                variant="danger"
            />
        </div>
    );
}
