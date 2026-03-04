import { Skeleton } from "@/components/ui/skeleton"

export function MediaCardSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between mb-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    )
}
