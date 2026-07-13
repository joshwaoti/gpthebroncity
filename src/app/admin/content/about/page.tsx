"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Save, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AboutContentAdmin() {
    const aboutSetting = useQuery(api.content.getSetting, { key: "aboutContent" });
    const saveSetting = useMutation(api.content.updateSetting);

    const [form, setForm] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const savedValues = (aboutSetting?.value as Record<string, string>) ?? {};
    const effective = { ...savedValues, ...form };
    const isLoading = aboutSetting === undefined;

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        try {
            await saveSetting({
                key: "aboutContent",
                value: effective,
                description: "About page vision & mission content",
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
                title="About Us Content"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Content" }, { label: "About Us" }]}
                action={
                    <Link href="/about" target="_blank">
                        <Button variant="outline" className="h-8 text-xs gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5" /> View Live
                        </Button>
                    </Link>
                }
            />
            <div className="p-6 max-w-3xl mx-auto space-y-6">
                <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                    <div>
                        <h2 className="font-semibold text-foreground">Vision &amp; Mission</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Shown on the About page. Leave a field blank to use the site&rsquo;s default text.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="animate-pulse space-y-3">
                            {Array(2).fill(null).map((_, i) => <div key={i} className="h-24 bg-accent/40 rounded-lg" />)}
                        </div>
                    ) : (
                        <>
                            <div>
                                <label className="text-xs text-muted-foreground">Our Vision</label>
                                <textarea
                                    value={effective.visionContent ?? ""}
                                    onChange={e => setForm(f => ({ ...f, visionContent: e.target.value }))}
                                    placeholder="We see a true growing spiritual church of Jesus Christ with an earthly relevance and heavenly focus."
                                    rows={3}
                                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1 resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">Our Mission</label>
                                <textarea
                                    value={effective.missionContent ?? ""}
                                    onChange={e => setForm(f => ({ ...f, missionContent: e.target.value }))}
                                    placeholder="We exist to create an enabling environment where saints pray, worship God, minister to each other and to the world..."
                                    rows={4}
                                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1 resize-none"
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <Button onClick={handleSave} isLoading={isSaving} className="gap-2">
                        <Save className="w-4 h-4" /> Save Changes
                    </Button>
                    {saved && <p className="text-sm text-[#6EA704] font-medium">✓ Saved! The About page now shows your changes.</p>}
                    {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                </div>
            </div>
        </div>
    );
}
