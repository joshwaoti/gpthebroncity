"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmLabel?: string;
    variant?: "danger" | "warning";
    isLoading?: boolean;
}

export function ConfirmDialog({
    isOpen, onClose, onConfirm, title, description,
    confirmLabel = "Confirm", variant = "danger", isLoading
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-sm w-full p-6">
                <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                </button>
                <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                    variant === "danger" ? "bg-red-100 dark:bg-red-900/30" : "bg-orange-100 dark:bg-orange-900/30"
                )}>
                    <AlertTriangle className={cn("w-6 h-6", variant === "danger" ? "text-red-500" : "text-orange-500")} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{description}</p>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                    <Button
                        onClick={onConfirm}
                        isLoading={isLoading}
                        className={cn("flex-1", variant === "danger" ? "bg-red-600 hover:bg-red-700 text-white" : "")}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}
