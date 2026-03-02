"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, FileAudio, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaUploaderProps {
    accept?: string;
    onUpload?: (file: File, dataUrl: string) => void;
    current?: string;
    type?: "image" | "audio" | "document";
    className?: string;
}

export function MediaUploader({
    accept = "image/*",
    onUpload,
    current,
    type = "image",
    className
}: MediaUploaderProps) {
    const [preview, setPreview] = useState<string | null>(current ?? null);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const icons = { image: ImageIcon, audio: FileAudio, document: FileText };
    const Icon = icons[type];

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            setPreview(dataUrl);
            onUpload?.(file, dataUrl);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    return (
        <div className={cn("relative", className)}>
            {preview && type === "image" ? (
                <div className="relative group rounded-xl overflow-hidden border border-border">
                    <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                            onClick={() => inputRef.current?.click()}
                            className="bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all"
                        >
                            Change
                        </button>
                        <button
                            onClick={() => setPreview(null)}
                            className="bg-red-500/20 hover:bg-red-500/40 text-white text-sm px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className={cn(
                        "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                        dragging
                            ? "border-[#257300] bg-[#257300]/5"
                            : "border-border hover:border-[#257300]/50 hover:bg-accent/30"
                    )}
                >
                    <Icon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-[#257300]">Click to upload</span> or drag and drop
                    </p>
                    {preview && type !== "image" && (
                        <p className="text-xs text-muted-foreground mt-1">File selected ✓</p>
                    )}
                </div>
            )}
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
        </div>
    );
}
