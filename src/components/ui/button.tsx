import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "bg-[#257300] text-white hover:bg-[#1e5c00] shadow-md hover:shadow-lg hover:shadow-[#257300]/20 btn-press",
                destructive:
                    "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg hover:shadow-red-500/20",
                outline:
                    "border-2 border-[#257300]/20 dark:border-white/10 bg-transparent text-[#257300] dark:text-white hover:bg-[#257300]/5 dark:hover:bg-white/5 hover:border-[#257300]/40 dark:hover:border-white/20",
                secondary:
                    "bg-[#F5F3EE] dark:bg-white/10 text-gray-800 dark:text-white hover:bg-[#EBE8E0] dark:hover:bg-white/15 border border-[#E8E5DD] dark:border-white/10",
                ghost:
                    "hover:bg-[#257300]/5 dark:hover:bg-white/5 hover:text-[#257300] dark:hover:text-white",
                link:
                    "text-[#257300] dark:text-[#B2CB20] underline-offset-4 hover:underline font-medium",
                cta:
                    "bg-[#B2CB20] text-[#0a0f05] font-bold hover:bg-[#c4d83a] shadow-[0_0_20px_rgba(178,203,32,0.3)] hover:shadow-[0_0_30px_rgba(178,203,32,0.5)] btn-press",
            },
            size: {
                default: "h-10 px-5 py-2",
                sm: "h-9 rounded-md px-3 text-xs",
                lg: "h-12 rounded-lg px-8 text-base",
                icon: "h-10 w-10",
                xl: "h-14 rounded-xl px-10 text-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "cta" | null | undefined
    size?: "default" | "sm" | "lg" | "icon" | "xl" | null | undefined
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
