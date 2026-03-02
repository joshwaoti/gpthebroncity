"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function AdminPagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Simple slice for standard ranges, can be enhanced with ellipses for large sets
    let displayPages = pages;
    if (totalPages > 5) {
        if (currentPage <= 3) {
            displayPages = [1, 2, 3, 4, 5];
        } else if (currentPage >= totalPages - 2) {
            displayPages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            displayPages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
        }
    }

    return (
        <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4 py-4 pt-6 border-t border-border mt-6", className)}>
            <p className="text-sm text-muted-foreground">
                Showing page <span className="font-semibold text-foreground">{currentPage}</span> of <span className="font-semibold text-foreground">{totalPages}</span>
            </p>

            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 rounded-md"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>

                {displayPages.map(page => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="icon"
                        className={cn(
                            "w-8 h-8 rounded-md text-sm",
                            currentPage === page ? "bg-[#257300] hover:bg-[#257300]/90 text-white" : ""
                        )}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Button>
                ))}

                <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 rounded-md"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
