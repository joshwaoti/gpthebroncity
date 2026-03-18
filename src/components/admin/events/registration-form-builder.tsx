"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical, Save, Users, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type FieldType = "text" | "email" | "phone" | "number" | "textarea" | "select";

interface FormField {
    id: string;
    label: string;
    type: FieldType;
    required: boolean;
    options?: string[];
    placeholder?: string;
}

interface Props {
    eventId: Id<"events">;
}

const FIELD_TYPES: { value: FieldType; label: string }[] = [
    { value: "text", label: "Short Text" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "number", label: "Number" },
    { value: "textarea", label: "Long Text" },
    { value: "select", label: "Dropdown" },
];

function nanoid(len = 8) {
    return Math.random().toString(36).slice(2, 2 + len);
}

export function RegistrationFormBuilder({ eventId }: Props) {
    const existingForm = useQuery(api.eventRegistrations.getForm, { eventId });
    const regCount = useQuery(api.eventRegistrations.getRegistrationCount, { eventId });
    const upsertForm = useMutation(api.eventRegistrations.upsertForm);

    const [enabled, setEnabled] = useState(false);
    const [maxCapacity, setMaxCapacity] = useState("");
    const [fields, setFields] = useState<FormField[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [expandedField, setExpandedField] = useState<string | null>(null);

    // Seed from existing form
    useEffect(() => {
        if (existingForm !== undefined) {
            if (existingForm) {
                setEnabled(existingForm.enabled);
                setMaxCapacity(existingForm.maxCapacity?.toString() ?? "");
                setFields(existingForm.fields as FormField[]);
            }
        }
    }, [existingForm]);

    const addField = () => {
        const id = nanoid();
        const newField: FormField = { id, label: "New Field", type: "text", required: false };
        setFields((f) => [...f, newField]);
        setExpandedField(id);
    };

    const removeField = (id: string) => {
        setFields((f) => f.filter((field) => field.id !== id));
        if (expandedField === id) setExpandedField(null);
    };

    const updateField = (id: string, patch: Partial<FormField>) => {
        setFields((f) => f.map((field) => field.id === id ? { ...field, ...patch } : field));
    };

    const moveField = (idx: number, dir: -1 | 1) => {
        const next = [...fields];
        const swap = idx + dir;
        if (swap < 0 || swap >= next.length) return;
        [next[idx], next[swap]] = [next[swap], next[idx]];
        setFields(next);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await upsertForm({
                eventId,
                enabled,
                fields,
                maxCapacity: maxCapacity ? parseInt(maxCapacity, 10) : undefined,
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            console.error(err);
            alert("Failed to save registration form.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-5">
            {/* Header row */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="font-semibold text-foreground">Registration Form</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Build a custom sign-up form for this event
                    </p>
                </div>
                <Link
                    href={`/admin/events/${eventId}/registrations`}
                    className="flex items-center gap-1.5 text-xs text-[#257300] hover:underline"
                >
                    <Users className="w-3.5 h-3.5" />
                    {regCount?.confirmed ?? 0} registrant{regCount?.confirmed !== 1 ? "s" : ""}
                </Link>
            </div>

            {/* Enable toggle */}
            <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-foreground">Enable Registration</p>
                    <p className="text-xs text-muted-foreground">Show a registration form on the event page</p>
                </div>
                <button
                    type="button"
                    onClick={() => setEnabled(!enabled)}
                    className={cn(
                        "relative w-11 h-6 rounded-full transition-colors focus:outline-none",
                        enabled ? "bg-[#257300]" : "bg-muted"
                    )}
                >
                    <span className={cn(
                        "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
                        enabled && "translate-x-5"
                    )} />
                </button>
            </div>

            {enabled && (
                <>
                    {/* Capacity */}
                    <div className="rounded-xl border border-border bg-card p-4">
                        <label className="text-xs text-muted-foreground">Max Capacity (leave empty for unlimited)</label>
                        <input
                            type="number"
                            min="1"
                            value={maxCapacity}
                            onChange={(e) => setMaxCapacity(e.target.value)}
                            placeholder="e.g. 100"
                            className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                        />
                    </div>

                    {/* Fields list */}
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">Form Fields</span>
                            <Button size="sm" variant="outline" onClick={addField} className="gap-1.5 h-7 text-xs">
                                <Plus className="w-3.5 h-3.5" /> Add Field
                            </Button>
                        </div>

                        {fields.length === 0 ? (
                            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                                No fields yet. Click "Add Field" to get started.
                            </div>
                        ) : (
                            <ul className="divide-y divide-border">
                                {fields.map((field, idx) => (
                                    <li key={field.id} className="p-3">
                                        {/* Collapsed row */}
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-col gap-0.5">
                                                <button type="button" onClick={() => moveField(idx, -1)} disabled={idx === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                                                    <ChevronUp className="w-3.5 h-3.5" />
                                                </button>
                                                <button type="button" onClick={() => moveField(idx, 1)} disabled={idx === fields.length - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-30">
                                                    <ChevronDown className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <GripVertical className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                                            <button
                                                type="button"
                                                onClick={() => setExpandedField(expandedField === field.id ? null : field.id)}
                                                className="flex-1 text-left"
                                            >
                                                <span className="text-sm font-medium text-foreground">{field.label || "Untitled Field"}</span>
                                                <span className="ml-2 text-xs text-muted-foreground">
                                                    {FIELD_TYPES.find((t) => t.value === field.type)?.label}
                                                    {field.required && " · Required"}
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeField(field.id)}
                                                className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        {/* Expanded editor */}
                                        {expandedField === field.id && (
                                            <div className="mt-3 ml-9 space-y-3 border-t border-border pt-3">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-xs text-muted-foreground">Label *</label>
                                                        <input
                                                            value={field.label}
                                                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                                                            className="w-full border border-border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-muted-foreground">Type</label>
                                                        <select
                                                            value={field.type}
                                                            onChange={(e) => updateField(field.id, { type: e.target.value as FieldType, options: undefined })}
                                                            className="w-full border border-border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                                                        >
                                                            {FIELD_TYPES.map((t) => (
                                                                <option key={t.value} value={t.value}>{t.label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs text-muted-foreground">Placeholder (optional)</label>
                                                    <input
                                                        value={field.placeholder ?? ""}
                                                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                                        className="w-full border border-border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                                                    />
                                                </div>
                                                {field.type === "select" && (
                                                    <div>
                                                        <label className="text-xs text-muted-foreground">Options (one per line)</label>
                                                        <textarea
                                                            rows={3}
                                                            value={(field.options ?? []).join("\n")}
                                                            onChange={(e) => updateField(field.id, { options: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
                                                            className="w-full border border-border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1 resize-none"
                                                        />
                                                    </div>
                                                )}
                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                    <input
                                                        type="checkbox"
                                                        checked={field.required}
                                                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                                        className="accent-[#257300] w-4 h-4"
                                                    />
                                                    <span className="text-sm text-foreground">Required field</span>
                                                </label>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}

            {/* Save */}
            <Button onClick={handleSave} disabled={isSaving} className="gap-2 w-full sm:w-auto">
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : saved ? "Saved ✓" : "Save Registration Form"}
            </Button>
        </div>
    );
}
