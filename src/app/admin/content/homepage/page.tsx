"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Save, ExternalLink } from "lucide-react";
import Link from "next/link";

const FIELDS = [
    { key: "badge", label: "Badge (small label above title)", placeholder: "2026 THEME" },
    { key: "titleLine1", label: "Title — Line 1", placeholder: "Christ Revealed," },
    { key: "titleLine2", label: "Title — Line 2", placeholder: "Christ Expressed" },
    { key: "tagline", label: "Tagline", placeholder: "Seeing Him Clearly. Embracing Him Deeply. Expressing Him Boldly." },
    { key: "description", label: "Scripture / Description", placeholder: "“Christ in you, the hope of glory” — Colossians 1:27" },
    { key: "ctaPrimary", label: "Primary Button Text", placeholder: "Plan Your Visit" },
    { key: "ctaSecondary", label: "Secondary Button Text", placeholder: "Watch Sermons" },
    { key: "bgImage", label: "Background Image URL", placeholder: "/assets/img/bg-4-2026.jpg" },
] as const;

export default function HomepageContentAdmin() {
    const heroSetting = useQuery(api.content.getSetting, { key: "homepageHero" });
    const saveSetting = useMutation(api.content.updateSetting);

    const [form, setForm] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const savedValues = (heroSetting?.value as Record<string, string>) ?? {};
    const effective = { ...savedValues, ...form };
    const isLoading = heroSetting === undefined;

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        try {
            await saveSetting({
                key: "homepageHero",
                value: effective,
                description: "Homepage hero section content",
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error(err);
            setError("Failed to save. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <AdminHeader
                title="Homepage Content"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "Homepage" }]}
                action={
                    <Link href="/" target="_blank">
                        <Button variant="outline" className="h-8 text-xs gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5" /> View Live
                        </Button>
                    </Link>
                }
            />
            <div className="p-6 max-w-3xl mx-auto space-y-6">
                <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                    <div>
                        <h2 className="font-semibold text-foreground">Hero Section</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            This is the large banner visitors see first. Leave a field blank to use the site&rsquo;s default text.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="animate-pulse space-y-3">
                            {Array(6).fill(null).map((_, i) => <div key={i} className="h-11 bg-accent/40 rounded-lg" />)}
                        </div>
                    ) : (
                        FIELDS.map(({ key, label, placeholder }) => (
                            <div key={key}>
                                <label className="text-xs text-muted-foreground">{label}</label>
                                {key === "description" || key === "tagline" ? (
                                    <textarea
                                        value={effective[key] ?? ""}
                                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                        placeholder={placeholder}
                                        rows={2}
                                        className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1 resize-none"
                                    />
                                ) : (
                                    <input
                                        value={effective[key] ?? ""}
                                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                        placeholder={placeholder}
                                        className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                                    />
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Button onClick={handleSave} isLoading={isSaving} className="gap-2">
                        <Save className="w-4 h-4" /> Save Changes
                    </Button>
                    {saved && <p className="text-sm text-[#6EA704] font-medium">✓ Saved! The homepage now shows your changes.</p>}
                    {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                </div>
            </div>
        </div>
    );
}
