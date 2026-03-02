import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    trend?: { value: number; label: string };
    color?: "green" | "gold" | "blue" | "orange";
    className?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, color = "green", className }: StatCardProps) {
    const colors = {
        green: "from-[#257300]/10 to-[#6EA704]/5 border-[#257300]/20 text-[#257300] dark:text-[#6EA704]",
        gold: "from-[#C8A229]/10 to-[#C8A229]/5 border-[#C8A229]/20 text-[#C8A229]",
        blue: "from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-500",
        orange: "from-orange-500/10 to-orange-600/5 border-orange-500/20 text-orange-500",
    };

    return (
        <div className={cn(
            "rounded-xl border bg-gradient-to-br p-5 relative overflow-hidden",
            colors[color],
            className
        )}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
                    {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
                    {trend && (
                        <div className={cn(
                            "inline-flex items-center gap-1 text-xs font-medium mt-2 px-2 py-0.5 rounded-full",
                            trend.value >= 0 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
                        </div>
                    )}
                </div>
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-current/10")}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}
