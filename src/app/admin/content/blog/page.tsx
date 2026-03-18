"use client";

import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
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
    ChevronLeft,
    ChevronRight,
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
    const seedBlogs = useMutation(api.blog.seedBlogPost);

    const [isSeeding, setIsSeeding] = useState(false);

    const handleSeed = async () => {
        setIsSeeding(true);
        try {
            // This is a simplified version of the seed logic that can be triggered from the UI
            // Normally we'd fetch the JSON or have it embedded
            const blogData = [
                {
                    title: "Are you Governed by a Kingdom or Worldly Mindset?",
                    category: "Theology",
                    excerpt: "Are you governed by a Kingdom or Worldly mindset? Explore how our perspective shapes our decisions and fruitfulness.",
                    author: "Rev. Albert Shitakwa",
                    publishDate: "June 18, 2023",
                    imageUrl: "/assets/img/blogs/kingdom_mindset.png",
                    slug: "kingdom-mindset"
                },
                {
                    title: "Raising Christlike Children",
                    category: "Family",
                    excerpt: "Practical wisdom on raising Christlike children who bring joy and glory to God and their parents.",
                    author: "Joseph Ngaara",
                    publishDate: "August 16, 2023",
                    imageUrl: "/assets/img/blogs/raising_children.png",
                    slug: "raising-christlike-children"
                },
                {
                    title: "The Culture Of A Transformed Community",
                    category: "Community",
                    excerpt: "Insights into the culture of the early church and how consistency in fellowship transforms a community.",
                    author: "Rev. Albert Shitakwa",
                    publishDate: "August 27, 2023",
                    imageUrl: "/assets/img/blogs/transformed_community.png",
                    slug: "transformed-community"
                },
                {
                    title: "What We Must Do To Grow - Become Restless",
                    category: "Growth",
                    excerpt: "What must we do to grow? Learn why becoming restless with the status quo is the first step to spiritual progress.",
                    author: "Rev. Albert Shitakwa",
                    publishDate: "July 26, 2023",
                    imageUrl: "/assets/img/blogs/becoming_restless.png",
                    slug: "becoming-restless"
                },
                {
                    title: "We Need To Grow: Change Is Critical For Growth",
                    category: "Growth",
                    excerpt: "Change is critical for growth. Discover why spiritual maturity requires activation and a willingness to leave the familiar.",
                    author: "Rev. Albert Shitakwa",
                    publishDate: "July 5, 2023",
                    imageUrl: "/assets/img/blogs/change_critical.png",
                    slug: "change-is-critical"
                },
                {
                    title: "Growing Holistically",
                    category: "Growth",
                    excerpt: "God is interested in your growth in all dimensions: spiritually, physically, intellectually, and socially.",
                    author: "Rev. Albert Shitakwa",
                    publishDate: "May 31, 2023",
                    imageUrl: "/assets/img/blogs/growing_holistically.png",
                    slug: "growing-holistically"
                },
                {
                    title: "Intentional Spiritual Growth - Add Perseverance to your Faith",
                    category: "Growth",
                    excerpt: "Intentional spiritual growth through perseverance. Learn how to build the muscle of endurance in your walk with Christ.",
                    author: "Rev. Albert Shitakwa",
                    publishDate: "October 11, 2023",
                    imageUrl: "/assets/img/blogs/intentional_growth.png",
                    slug: "intentional-spiritual-growth"
                },
                {
                    title: "Your Doctrine And Manner Of Life",
                    category: "Doctrine",
                    excerpt: "Your doctrine and manner of life should be one. Explore why true Christlikeness is found in the fruit we produce.",
                    author: "Rev. Albert Shitakwa",
                    publishDate: "October 22, 2023",
                    imageUrl: "/assets/img/blogs/doctrine_life.png",
                    slug: "doctrine-and-life"
                },
                {
                    title: "The Early Church Was Consistent In Worship",
                    category: "Worship",
                    excerpt: "Lessons from the early church on consistent congregational worship and its impact on the community.",
                    author: "Rev. Albert Shitakwa",
                    publishDate: "September 17, 2023",
                    imageUrl: "/assets/img/blogs/early_church_worship.png",
                    slug: "early-church-worship"
                }
            ];

            for (const blog of blogData) {
                await seedBlogs({
                    ...blog,
                    content: "Content is being extracted from sermon notes. This is a placeholder for the full PDF content which is quite long.",
                    status: "published"
                });
            }
            alert("Seeding complete!");
        } catch (e) {
            console.error(e);
            alert("Failed to seed blogs.");
        } finally {
            setIsSeeding(false);
        }
    };

    const filteredBlogs = results.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: any) => {
        if (confirm("Are you sure you want to delete this blog post?")) {
            await removeBlog({ id });
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
                    <div className="flex items-center justify-between mb-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={handleSeed}
                                disabled={isSeeding}
                                className="gap-2"
                            >
                                {isSeeding ? "Seeding..." : "Seed Initial Data"}
                            </Button>
                            <Link href="/admin/content/blog/new">
                                <Button className="gap-2 whitespace-nowrap">
                                    <Plus className="w-4 h-4" /> New Post
                                </Button>
                            </Link>
                        </div>
                    </div>

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
                            ) : filteredBlogs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                        No blog posts found
                                    </TableCell>
                                </TableRow>
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
                                                        onClick={() => handleDelete(blog._id)}
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
        </div>
    );
}
