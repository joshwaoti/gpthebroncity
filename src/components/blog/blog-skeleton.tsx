import { Skeleton } from "@/components/ui/skeleton";

export function BlogSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col gap-4">
                    <Skeleton className="aspect-video w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function FeaturedBlogSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-card rounded-2xl overflow-hidden border border-border p-4 md:p-8">
            <Skeleton className="aspect-[4/3] lg:aspect-square w-full rounded-xl" />
            <div className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 md:h-12 w-full" />
                    <Skeleton className="h-10 md:h-12 w-2/3" />
                </div>
                <Skeleton className="h-24 w-full" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            </div>
        </div>
    );
}
