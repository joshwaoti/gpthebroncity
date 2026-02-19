import Image from "next/image"

interface BrandLogoProps {
    className?: string
    variant?: "default" | "white"
}

export function BrandLogo({ className }: BrandLogoProps) {
    // Always use logo-2.png as requested — this logo works on all backgrounds.
    return (
        <div className={className}>
            <Image
                src="/assets/img/logo/logo-2.png"
                alt="GPT Hebron City Logo"
                width={180}
                height={50}
                className="block"
                priority
            />
        </div>
    )
}
