"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { MediaUploader } from "@/components/admin/media-uploader";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { isBlogContentEmpty, sanitizeBlogContent } from "@/lib/blog-content";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";

const categories = ["Theology", "Leadership", "Vision", "Doctrine", "Family", "Growth", "Community", "Worship"] as const;

export default function NewBlogPostPage() {
    const router = useRouter();
    const createPost = useMutation(api.blog.create);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        content: "",
        excerpt: "",
        author: "",
        category: "Theology" as (typeof categories)[number],
        image: "",
        slug: "",
        readTime: "5 min read",
        featured: false,
        status: "draft" as "draft" | "published",
        metaTitle: "",
        metaDescription: "",
    });

    const generateSlug = (title: string) =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const set = <Key extends keyof typeof form>(key: Key, value: (typeof form)[Key]) => {
        setForm(current => ({ ...current, [key]: value }));
    };

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (status: "draft" | "published") => {
        if (!form.title.trim()) { setError("Title is required."); return; }
        if (isBlogContentEmpty(form.content)) { setError("Content is required."); return; }
        setError(null);
        setIsLoading(true);
        try {
            const finalSlug = form.slug || generateSlug(form.title);
            await createPost({
                title: form.title,
                content: sanitizeBlogContent(form.content),
                excerpt: form.excerpt || undefined,
                author: form.author || undefined,
                category: form.category,
                imageUrl: form.image || undefined,
                publishDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                slug: finalSlug,
                status,
            });
            router.push("/admin/content/blog");
        } catch (err: unknown) {
            console.error(err);
            const message = err instanceof Error ? err.message : "";
            setError(message.includes("slug") ? "That slug is already in use — pick a different one." : "Failed to save the post. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <AdminHeader
                title="New Blog Post"
                breadcrumbs={[
                    { label: "Admin", href: "/admin" },
                    { label: "Blog", href: "/admin/content/blog" },
                    { label: "New Post" }
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
                                onChange={e => { set("title", e.target.value); set("slug", generateSlug(e.target.value)); }}
                                placeholder="Enter post title..."
                                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] text-xl font-semibold"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Excerpt *</label>
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
                            <h3 className="font-semibold text-foreground text-sm">Publish</h3>
                            <Button
                                onClick={() => handleSubmit("published")}
                                isLoading={isLoading}
                                className="w-full"
                            >
                                <Save className="w-4 h-4 mr-2" /> Publish Now
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleSubmit("draft")}
                                isLoading={isLoading}
                                className="w-full"
                            >
                                Save as Draft
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => router.back()}
                                className="w-full"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" /> Cancel
                            </Button>
                        </div>

                        {/* Metadata */}
                        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                            <h3 className="font-semibold text-foreground text-sm">Post Details</h3>
                            <div>
                                <label className="text-xs text-muted-foreground">Author *</label>
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
                                    onChange={e => set("category", e.target.value as (typeof categories)[number])}
                                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                                >
                                    {categories.map(c => <option key={c}>{c}</option>)}
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
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">Read Time</label>
                                <input
                                    value={form.readTime}
                                    onChange={e => set("readTime", e.target.value)}
                                    placeholder="5 min read"
                                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                                />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.featured}
                                    onChange={e => set("featured", e.target.checked)}
                                    className="w-4 h-4 accent-[#257300]"
                                />
                                <span className="text-sm text-foreground">Featured post</span>
                            </label>
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

                        {/* SEO */}
                        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                            <h3 className="font-semibold text-foreground text-sm">SEO</h3>
                            <div>
                                <label className="text-xs text-muted-foreground">Meta Title</label>
                                <input
                                    value={form.metaTitle}
                                    onChange={e => set("metaTitle", e.target.value)}
                                    placeholder={form.title}
                                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">Meta Description</label>
                                <textarea
                                    value={form.metaDescription}
                                    onChange={e => set("metaDescription", e.target.value)}
                                    placeholder={form.excerpt}
                                    rows={2}
                                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1 resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
