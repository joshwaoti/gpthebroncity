"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { MediaUploader } from "@/components/admin/media-uploader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Eye } from "lucide-react";

import { useUser } from "@clerk/nextjs";

const categories = ["Theology", "Leadership", "Vision", "Doctrine", "Family"] as const;

export default function NewBlogPostPage() {
    const { user } = useUser();
    const router = useRouter();
    const createPost = useMutation(api.blog.create);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState(false);
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

    const set = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }));

    const handleSubmit = async (status: "draft" | "published") => {
        setIsLoading(true);
        try {
            const finalSlug = form.slug || generateSlug(form.title);
            await createPost({
                title: form.title,
                content: form.content,
                excerpt: form.excerpt,
                author: form.author,
                imageUrl: form.image,
                slug: finalSlug,
                status,
            });
            router.push("/admin/content/blog");
        } catch (err) {
            console.error(err);
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
            <div className="p-6 max-w-5xl mx-auto">
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
                                <label className="text-sm font-medium text-foreground">Content * (Markdown)</label>
                                <button
                                    onClick={() => setPreview(!preview)}
                                    className="text-xs text-[#257300] flex items-center gap-1"
                                >
                                    <Eye className="w-3 h-3" /> {preview ? "Edit" : "Preview"}
                                </button>
                            </div>
                            {preview ? (
                                <div
                                    className="border border-border rounded-lg p-4 min-h-[400px] prose prose-sm dark:prose-invert max-w-none bg-background"
                                    dangerouslySetInnerHTML={{ __html: form.content.replace(/\n/g, "<br>").replace(/^# (.+)$/gm, "<h1>$1</h1>").replace(/^## (.+)$/gm, "<h2>$1</h2>") }}
                                />
                            ) : (
                                <textarea
                                    value={form.content}
                                    onChange={e => set("content", e.target.value)}
                                    placeholder={`# ${form.title || "Post Title"}\n\nStart writing your post in Markdown...\n\n## Section Heading\n\nYour content here...`}
                                    rows={20}
                                    className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] font-mono resize-none"
                                />
                            )}
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
                                    onChange={e => set("category", e.target.value)}
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
