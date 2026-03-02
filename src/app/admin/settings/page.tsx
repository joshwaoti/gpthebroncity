"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Save, Globe, MapPin, Phone, Mail, Clock, Shield } from "lucide-react";

export default function SettingsPage() {
    const settings = useQuery(api.content.getSetting, { key: "siteConfig" });
    const saveSettings = useMutation(api.content.updateSetting);
    const auditLog = useQuery(api.auditLog.getAll as any, { limit: 20 }) as any[];
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<"general" | "contact" | "security" | "audit">("general");

    const [form, setForm] = useState<any>({});
    const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

    // Populate form from settings when loaded
    const effectiveForm = { ...settings, ...form };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Map our form keys to the Convex update args
            const patch: any = {};
            if (effectiveForm.sundayService) patch.sundayServiceTimes = effectiveForm.sundayService;
            if (effectiveForm.wednesdayService) patch.wednesdayServiceTime = effectiveForm.wednesdayService;
            if (effectiveForm.phone) patch.contactPhone = effectiveForm.phone;
            if (effectiveForm.email) patch.contactEmail = effectiveForm.email;
            if (effectiveForm.address) patch.contactAddress = effectiveForm.address;
            if (effectiveForm.siteName) patch.yearlyTheme = effectiveForm.siteName;
            if (effectiveForm.tagline) patch.themeScripture = effectiveForm.tagline;
            if (effectiveForm.socialLinks?.facebook) patch.facebookUrl = effectiveForm.socialLinks.facebook;
            if (effectiveForm.socialLinks?.instagram) patch.instagramUrl = effectiveForm.socialLinks.instagram;
            if (effectiveForm.socialLinks?.youtube) patch.youtubeUrl = effectiveForm.socialLinks.youtube;
            if (effectiveForm.socialLinks?.twitter) patch.xUrl = effectiveForm.socialLinks.twitter;
            await saveSettings(patch);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: "general" as const, label: "General", icon: Globe },
        { id: "contact" as const, label: "Contact Info", icon: Phone },
        { id: "security" as const, label: "Security", icon: Shield },
        { id: "audit" as const, label: "Audit Log", icon: Clock },
    ];

    const actionColors: Record<string, string> = {
        create: "text-green-500 bg-green-500/10",
        update: "text-blue-500 bg-blue-500/10",
        delete: "text-red-500 bg-red-500/10",
        publish: "text-[#B2CB20] bg-[#B2CB20]/10",
        archive: "text-orange-500 bg-orange-500/10",
    };

    return (
        <div>
            <AdminHeader
                title="Settings"
                breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }]}
            />
            <div className="p-6 max-w-4xl mx-auto">
                {/* Tabs */}
                <div className="flex gap-1 mb-6 border-b border-border">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-all ${activeTab === tab.id
                                    ? "border-[#257300] text-[#257300]"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* General */}
                {activeTab === "general" && (
                    <div className="space-y-5">
                        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                            <h3 className="font-semibold text-foreground">Site Identity</h3>
                            <div>
                                <label className="text-xs text-muted-foreground">Site Name</label>
                                <input value={effectiveForm.siteName ?? ""} onChange={e => set("siteName", e.target.value)} placeholder="GPT Hebron City" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">Tagline</label>
                                <input value={effectiveForm.tagline ?? ""} onChange={e => set("tagline", e.target.value)} placeholder="Christ Revealed, Christ Expressed" className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">Description / About Text</label>
                                <textarea value={effectiveForm.description ?? ""} onChange={e => set("description", e.target.value)} rows={3} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1 resize-none" />
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                            <h3 className="font-semibold text-foreground">Service Times</h3>
                            {[
                                { key: "sundayService", label: "Sunday Service" },
                                { key: "wednesdayService", label: "Wednesday Service" },
                                { key: "prayerService", label: "Prayer Service" },
                            ].map(({ key, label }) => (
                                <div key={key} className="flex gap-3 items-center">
                                    <label className="text-xs text-muted-foreground w-36 flex-shrink-0">{label}</label>
                                    <input
                                        value={effectiveForm[key] ?? ""}
                                        onChange={e => set(key, e.target.value)}
                                        placeholder="e.g. Sundays at 10:00 AM & 5:00 PM"
                                        className="flex-1 border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Contact info */}
                {activeTab === "contact" && (
                    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                        <h3 className="font-semibold text-foreground">Contact Information</h3>
                        {[
                            { key: "address", label: "Address", icon: MapPin, placeholder: "Off Muranga Road, Nairobi" },
                            { key: "phone", label: "Phone", icon: Phone, placeholder: "+254 712 345 678" },
                            { key: "email", label: "Email", icon: Mail, placeholder: "info@gpthebroncity.org" },
                            { key: "mapLink", label: "Google Maps URL", icon: Globe, placeholder: "https://maps.google.com/..." },
                        ].map(({ key, label, icon: Icon, placeholder }) => (
                            <div key={key}>
                                <label className="text-xs text-muted-foreground">{label}</label>
                                <div className="relative mt-1">
                                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input value={effectiveForm[key] ?? ""} onChange={e => set(key, e.target.value)} placeholder={placeholder} className="w-full border border-border rounded-lg pl-9 pr-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]" />
                                </div>
                            </div>
                        ))}

                        <h3 className="font-semibold text-foreground pt-2">Social Media</h3>
                        {[
                            { key: "facebook", label: "Facebook" },
                            { key: "instagram", label: "Instagram" },
                            { key: "youtube", label: "YouTube" },
                            { key: "twitter", label: "X / Twitter" },
                        ].map(({ key, label }) => (
                            <div key={key}>
                                <label className="text-xs text-muted-foreground">{label}</label>
                                <input value={effectiveForm.socialLinks?.[key] ?? ""} onChange={e => set("socialLinks", { ...effectiveForm.socialLinks, [key]: e.target.value })} placeholder={`https://${key}.com/...`} className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Security info tab */}
                {activeTab === "security" && (
                    <div className="space-y-5">
                        <div className="bg-card border border-border rounded-xl p-5">
                            <h3 className="font-semibold text-foreground mb-2">Access Control</h3>
                            <p className="text-sm text-muted-foreground">
                                Role-based access control (RBAC) is enforced at both the frontend and backend. Use the <strong>Users</strong> section to manage roles. Only Super Admins can modify user roles.
                            </p>
                        </div>
                        <div className="bg-[#C8A229]/5 border border-[#C8A229]/20 rounded-xl p-5">
                            <p className="text-sm font-semibold text-[#C8A229] mb-1">⚠ Important</p>
                            <p className="text-xs text-muted-foreground">There must always be at least one Super Admin. The system will prevent you from removing super admin status from yourself.</p>
                        </div>
                    </div>
                )}

                {/* Audit log tab */}
                {activeTab === "audit" && (
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border bg-accent/30">
                                    <th className="text-left px-4 py-3 text-muted-foreground font-medium">Action</th>
                                    <th className="text-left px-4 py-3 text-muted-foreground font-medium">Resource</th>
                                    <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden sm:table-cell">User</th>
                                    <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!auditLog ? (
                                    <tr><td colSpan={4} className="text-center py-8 text-muted-foreground">Loading...</td></tr>
                                ) : auditLog.length === 0 ? (
                                    <tr><td colSpan={4} className="text-center py-8 text-muted-foreground">No activity recorded yet</td></tr>
                                ) : (
                                    auditLog.filter(Boolean).map(entry => (
                                        <tr key={entry?._id} className="border-b border-border last:border-0 hover:bg-accent/20">
                                            <td className="px-4 py-3">
                                                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md ${actionColors[entry?.action as any] ?? "text-gray-500 bg-gray-500/10"}`}>
                                                    {entry?.action}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="text-xs text-foreground font-medium">{entry?.entityType}</p>
                                                <p className="text-[10px] text-muted-foreground">{entry?.entityId}</p>
                                            </td>
                                            <td className="px-4 py-3 hidden sm:table-cell text-xs text-muted-foreground">{entry?.userName}</td>
                                            <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground">{entry?._creationTime ? new Date(entry._creationTime).toLocaleString() : ""}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Save bar (not for audit tab) */}
                {activeTab !== "audit" && activeTab !== "security" && (
                    <div className="mt-6 flex items-center gap-3">
                        <Button onClick={handleSave} isLoading={isSaving} className="gap-2">
                            <Save className="w-4 h-4" /> Save Changes
                        </Button>
                        {saved && <p className="text-sm text-[#6EA704] font-medium">✓ Settings saved!</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
