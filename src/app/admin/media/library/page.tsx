"use client";

import { useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { AdminHeader } from "@/components/admin/admin-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { EmptyState } from "@/components/admin/empty-state";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, Copy, Check, Trash2, FileIcon, Loader2 } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function formatSize(bytes?: number) {
    if (!bytes) return "";
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaLibraryPage() {
    const assets = useQuery(api.media.list);
    const generateUploadUrl = useMutation(api.media.generateUploadUrl);
    const saveAsset = useMutation(api.media.saveAsset);
    const removeAsset = useMutation(api.media.remove);

    const inputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<Id<"mediaAssets"> | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setUploadError(null);
        setIsUploading(true);
        try {
            for (const file of Array.from(files)) {
                if (file.size > MAX_FILE_SIZE) {
                    setUploadError(`"${file.name}" is larger than 10 MB and was skipped.`);
                    continue;
                }
                const uploadUrl = await generateUploadUrl();
                const res = await fetch(uploadUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type || "application/octet-stream" },
                    body: file,
                });
                if (!res.ok) throw new Error(`Upload failed for ${file.name}`);
                const { storageId } = await res.json();
                await saveAsset({
                    storageId,
                    name: file.name,
                    contentType: file.type || undefined,
                    size: file.size,
                });
            }
        } catch (err) {
            console.error(err);
            setUploadError("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const handleCopy = async (id: string, url: string | null) => {
        if (!url) return;
        await navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await removeAsset({ id: deleteId });
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    return (
        <div>
            <AdminHeader
                title="Media Library"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Media" }, { label: "Library" }]}
                action={
                    <Button
                        onClick={() => inputRef.current?.click()}
                        disabled={isUploading}
                        className="gap-2 h-8 text-xs"
                    >
                        {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                        {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                }
            />
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => handleFiles(e.target.files)}
            />

            <div className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                    Upload images here, then copy their URL to use as blog covers, event banners, or sermon thumbnails. Max 10&nbsp;MB per image.
                </p>

                {uploadError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                        {uploadError}
                    </div>
                )}

                {assets === undefined ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {Array(8).fill(null).map((_, i) => (
                            <div key={i} className="animate-pulse aspect-square bg-card border border-border rounded-xl" />
                        ))}
                    </div>
                ) : assets.length === 0 ? (
                    <div className="bg-card border border-dashed border-border rounded-xl">
                        <EmptyState
                            icon={ImageIcon}
                            title="Your media library is empty"
                            description="Upload images once and reuse them anywhere on the site — blog covers, event banners, and sermon thumbnails."
                            actionLabel="Upload your first image"
                            onAction={() => inputRef.current?.click()}
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {assets.map((asset) => (
                            <div key={asset._id} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-[#257300]/40 transition-all">
                                <div className="aspect-square bg-accent/40 relative">
                                    {asset.url && asset.contentType?.startsWith("image/") ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FileIcon className="w-8 h-8 text-muted-foreground/50" />
                                        </div>
                                    )}
                                    {/* Hover actions */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleCopy(asset._id, asset.url)}
                                            title="Copy URL"
                                            className="w-9 h-9 rounded-lg bg-white/90 hover:bg-white flex items-center justify-center text-zinc-800 transition-colors"
                                        >
                                            {copiedId === asset._id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => setDeleteId(asset._id)}
                                            title="Delete"
                                            className="w-9 h-9 rounded-lg bg-white/90 hover:bg-red-50 flex items-center justify-center text-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-2.5">
                                    <p className="text-xs font-medium text-foreground truncate" title={asset.name}>{asset.name}</p>
                                    <p className="text-[10px] text-muted-foreground">{formatSize(asset.size)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                isLoading={isDeleting}
                title="Delete Image"
                description="This image will be permanently removed. Pages currently using its URL will show a broken image."
                confirmLabel="Delete Image"
                variant="danger"
            />
        </div>
    );
}
