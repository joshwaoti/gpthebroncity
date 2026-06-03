import Image from "next/image"
import { HandHeart, Route, Sprout, Users } from "lucide-react"
import { aboutData } from "@/data"

const phaseIcons = {
    encounter: Route,
    connect: Users,
    grow: Sprout,
    serve: HandHeart,
}

export function GrowthTrack() {
    return (
        <section className="border-b border-border bg-background py-16 md:py-20">
            <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                    <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold">
                        {aboutData.growthTrack.badge}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                        {aboutData.growthTrack.title}
                    </h2>
                    <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
                        {aboutData.growthTrack.description}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {aboutData.growthTrack.phases.map((phase) => {
                            const Icon = phaseIcons[phase.id as keyof typeof phaseIcons] ?? Route

                            return (
                                <div key={phase.id} className="rounded-lg border border-border bg-card p-4">
                                    <div className="flex items-start gap-3">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="text-base font-bold text-foreground">{phase.label}</h3>
                                            <p className="mt-1 text-sm leading-6 text-muted-foreground">{phase.detail}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <figure className="overflow-hidden rounded-lg border border-border bg-card p-2 shadow-sm">
                    <Image
                        src={aboutData.growthTrack.image}
                        alt={aboutData.growthTrack.alt}
                        width={1263}
                        height={717}
                        sizes="(min-width: 1024px) 52vw, 100vw"
                        className="h-auto w-full"
                    />
                </figure>
            </div>
        </section>
    )
}
