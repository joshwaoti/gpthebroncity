import Image from "next/image"

interface BrandLogoProps {
    className?: string
    variant?: "default" | "white"
}

export function BrandLogo({ className }: BrandLogoProps) {
    return (
        <div className={className}>
            <Image
                src="/assets/img/logo/church-logo-white.png"
                alt="GPT Hebron City Logo"
                width={160}
                height={48}
                className="h-full w-auto"
                priority
            />
        </div>
    )
}
