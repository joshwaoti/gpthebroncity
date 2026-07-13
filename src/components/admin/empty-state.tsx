"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
    className?: string;
}

/**
 * Consistent empty state for admin lists: icon in a soft ring,
 * a title, one line of context, and an optional call to action.
 */
export function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    actionHref,
    onAction,
    className,
}: EmptyStateProps) {
    const action = actionLabel ? (
        actionHref ? (
            <Link href={actionHref}>
                <Button size="sm" className="mt-4">{actionLabel}</Button>
            </Link>
        ) : (
            <Button size="sm" className="mt-4" onClick={onAction}>{actionLabel}</Button>
        )
    ) : null;

    return (
        <div className={cn("flex flex-col items-center justify-center text-center py-16 px-6", className)}>
            <div className="w-14 h-14 rounded-2xl bg-[#257300]/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#257300] dark:text-[#6EA704]" />
            </div>
            <p className="font-semibold text-foreground">{title}</p>
            {description && (
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
            )}
            {action}
        </div>
    );
}
