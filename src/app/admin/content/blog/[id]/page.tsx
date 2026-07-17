"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { AdminHeader } from "@/components/admin/admin-header";
import { MediaUploader } from "@/components/admin/media-uploader";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { isBlogContentEmpty, sanitizeBlogContent } from "@/lib/blog-content";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

const categories = ["Theology", "Leadership", "Vision", "Doctrine", "Family", "Growth", "Community", "Worship"] as const;

export default function EditBlogPostPage() {
    const params = useParams();
    const id = params.id as Id<"blogPosts">;
    const router = useRouter();

    const post = useQuery(api.blog.getById, { id });
    const updatePost = useMutation(api.blog.update);
    const removePost = useMutation(api.blog.remove);

    const [isLoading, setIsLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: "",
        content: "",
        excerpt: "",
        author: "",
        category: "Theology",
        image: "",
        slug: "",
        status: "draft" as "draft" | "published",
    });

    useEffect(() => {
        if (post) {
            setForm({
                title: post.title ?? "",
                content: post.content ?? "",
                excerpt: post.excerpt ?? "",
                author: post.author ?? "",
                category: post.category ?? "Theology",
                image: post.imageUrl ?? "",
                slug: post.slug ?? "",
                status: post.status ?? "draft",
            });
        }
    }, [post]);

    const set = <Key extends keyof typeof form>(key: Key, value: (typeof form)[Key]) => {
        setForm(current => ({ ...current, [key]: value }));
    };

    const handleSubmit = async (status: "draft" | "published") => {
        if (!form.title.trim()) { setError("Title is required."); return; }
        if (isBlogContentEmpty(form.content)) { setError("Content is required."); return; }
        setError(null);
        setIsLoading(true);
        try {
            await updatePost({
                id,
                title: form.title,
                content: sanitizeBlogContent(form.content),
                excerpt: form.excerpt || undefined,
                author: form.author || undefined,
                category: form.category,
                imageUrl: form.image || undefined,
                slug: form.slug || undefined,
                status,
            });
            router.push("/admin/content/blog");
        } catch (err: unknown) {
            console.error(err);
            const message = err instanceof Error ? err.message : "";
            setError(message.includes("slug") ? "That slug is already in use by another post." : "Failed to save changes. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await removePost({ id });
            router.push("/admin/content/blog");
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    };

    if (post === undefined) {
        return (
            <div>
                <AdminHeader title="Edit Post" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Blog", href: "/admin/content/blog" }, { label: "Edit" }]} />
                <div className="p-6 max-w-5xl mx-auto">
                    <div className="animate-pulse space-y-4">
                        {Array(6).fill(null).map((_, i) => <div key={i} className="h-12 bg-card rounded-xl border border-border" />)}
                    </div>
                </div>
            </div>
        );
    }

    if (post === null) {
        return (
            <div>
                <AdminHeader title="Post Not Found" breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Blog", href: "/admin/content/blog" }]} />
                <div className="p-10 text-center">
                    <p className="text-muted-foreground mb-4">This blog post doesn&rsquo;t exist or may have been deleted.</p>
                    <Button onClick={() => router.push("/admin/content/blog")}>Back to Blog Posts</Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AdminHeader
                title="Edit Blog Post"
                breadcrumbs={[
                    { label: "Admin", href: "/admin" },
                    { label: "Blog", href: "/admin/content/blog" },
                    { label: post.title }
                ]}
            />
            <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main editor */}
                    <div className="lg:col-span-2 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Title *</label>
                            <input
                                value={form.title}
                                onChange={e => set("title", e.target.value)}
                                placeholder="Enter post title..."
                                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] text-xl font-semibold"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Excerpt</label>
                            <textarea
                                value={form.excerpt}
                                onChange={e => set("excerpt", e.target.value)}
                                placeholder="Brief summary shown in listings..."
                                rows={2}
                                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] resize-none"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-medium text-foreground">Content *</label>
                                <span className="text-xs text-muted-foreground">Rich text editor</span>
                            </div>
                            <RichTextEditor
                                value={form.content}
                                onChange={content => set("content", content)}
                                placeholder="Write your post or paste formatted content here…"
                            />
                        </div>
                    </div>

                    {/* Sidebar options */}
                    <div className="space-y-4">
                        {/* Publish actions */}
                        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-foreground text-sm">Publish</h3>
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${post.status === "published" ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-600"}`}>
                                    {post.status}
                                </span>
                            </div>
                            <Button
                                onClick={() => handleSubmit("published")}
                                isLoading={isLoading}
                                className="w-full"
                            >
                                <Save className="w-4 h-4 mr-2" /> {post.status === "published" ? "Update Post" : "Publish Now"}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleSubmit("draft")}
                                isLoading={isLoading}
                                className="w-full"
                            >
                                {post.status === "published" ? "Unpublish to Draft" : "Save as Draft"}
                            </Button>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => router.push("/admin/content/blog")}
                                    className="flex-1"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setShowDelete(true)}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            {post.status === "published" && (
                                <Link
                                    href={`/read/${post.slug}`}
                                    target="_blank"
                                    className="flex items-center justify-center gap-1.5 text-xs text-[#257300] hover:underline pt-1"
                                >
                                    <ExternalLink className="w-3 h-3" /> View live post
                                </Link>
                            )}
                        </div>

                        {/* Metadata */}
                        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                            <h3 className="font-semibold text-foreground text-sm">Post Details</h3>
                            <div>
                                <label className="text-xs text-muted-foreground">Author</label>
                                <input
                                    value={form.author}
                                    onChange={e => set("author", e.target.value)}
                                    placeholder="Author name"
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
                                    {!categories.some(category => category === form.category) && (
                                        <option value={form.category}>{form.category}</option>
                                    )}
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">Slug (URL)</label>
                                <input
                                    value={form.slug}
                                    onChange={e => set("slug", e.target.value)}
                                    placeholder="post-url-slug"
                                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1 font-mono"
                                />
                                <p className="text-[10px] text-muted-foreground mt-1">Changing the slug changes the public URL of this post.</p>
                            </div>
                        </div>

                        {/* Cover image */}
                        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                            <h3 className="font-semibold text-foreground text-sm">Cover Image</h3>
                            <MediaUploader
                                type="image"
                                onUpload={(_, dataUrl) => set("image", dataUrl)}
                                current={form.image}
                            />
                            <input
                                value={form.image}
                                onChange={e => set("image", e.target.value)}
                                placeholder="Or paste image URL..."
                                className="w-full border border-border rounded-lg px-3 py-2 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                isOpen={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Delete Blog Post"
                description={`"${post.title}" will be permanently deleted. This cannot be undone.`}
                confirmLabel="Delete Post"
                variant="danger"
            />
        </div>
    );
}
