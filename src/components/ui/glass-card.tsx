import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "light" | "dark" | "hero"
    interactive?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, variant = "default", interactive = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-2xl border backdrop-blur-md transition-all duration-300",
                    {
                        "bg-black/40 border-white/10": variant === "default",
                        "bg-white/5 border-white/20": variant === "light",
                        "bg-black/60 border-white/5": variant === "dark",
                        "bg-[#257300]/20 border-white/10 shadow-2xl": variant === "hero",
                        "hover:-translate-y-1 hover:shadow-lg cursor-pointer": interactive,
                    },
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
