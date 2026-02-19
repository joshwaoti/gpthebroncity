import Image from "next/image"

interface BrandLogoProps {
    className?: string
    variant?: "default" | "white"
}

export function BrandLogo({ className, variant = "default" }: BrandLogoProps) {
    // Always show the dark logo (logo.png) for visibility on all backgrounds.
    // The white logo is invisible on light/white backgrounds, so we disable it.
    return (
        <div className={className}>
            <Image
                src="/assets/img/logo/logo.png"
                alt="GPT Hebron City Logo"
                width={180}
                height={50}
                className="block"
                priority
            />
        </div>
    )
}
