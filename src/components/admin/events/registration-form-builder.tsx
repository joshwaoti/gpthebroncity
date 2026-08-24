"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical, Save, Users, ChevronDown, ChevronUp, Copy, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    findFormValidationError,
    isChoiceField,
    sanitizeChoiceOptions,
} from "@/lib/registration-fields";

type FieldType = "text" | "email" | "phone" | "number" | "textarea" | "select" | "checkbox";

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
    { value: "checkbox", label: "Checkboxes" },
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
    const [error, setError] = useState<string | null>(null);
    const [isToggling, setIsToggling] = useState(false);
    const [expandedField, setExpandedField] = useState<string | null>(null);
    const [linkCopied, setLinkCopied] = useState(false);

    const registrationUrl = typeof window !== "undefined"
        ? `${window.location.origin}/events/${eventId}?register=true`
        : "";

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

    /** Changing the type keeps the option list when both types use options. */
    const changeFieldType = (id: string, type: FieldType) => {
        setFields((f) => f.map((field) => {
            if (field.id !== id) return field;
            if (!isChoiceField(type)) return { ...field, type, options: undefined };
            // Start every option-based field with one blank row to fill in
            const options = isChoiceField(field.type) && field.options?.length ? field.options : [""];
            return { ...field, type, options };
        }));
    };

    const addOption = (id: string) => {
        setFields((f) => f.map((field) =>
            field.id === id ? { ...field, options: [...(field.options ?? []), ""] } : field
        ));
    };

    const updateOption = (id: string, idx: number, value: string) => {
        setFields((f) => f.map((field) => {
            if (field.id !== id) return field;
            const options = [...(field.options ?? [])];
            options[idx] = value;
            return { ...field, options };
        }));
    };

    const removeOption = (id: string, idx: number) => {
        setFields((f) => f.map((field) =>
            field.id === id
                ? { ...field, options: (field.options ?? []).filter((_, i) => i !== idx) }
                : field
        ));
    };

    const moveOption = (id: string, idx: number, dir: -1 | 1) => {
        setFields((f) => f.map((field) => {
            if (field.id !== id) return field;
            const options = [...(field.options ?? [])];
            const swap = idx + dir;
            if (swap < 0 || swap >= options.length) return field;
            [options[idx], options[swap]] = [options[swap], options[idx]];
            return { ...field, options };
        }));
    };

    /** Options are edited loosely (blank rows, duplicates) — clean them before saving. */
    const sanitizeFields = (list: FormField[]): FormField[] =>
        list.map((field) => isChoiceField(field.type)
            ? { ...field, options: sanitizeChoiceOptions(field.options) }
            : { ...field, options: undefined }
        );

    const moveField = (idx: number, dir: -1 | 1) => {
        const next = [...fields];
        const swap = idx + dir;
        if (swap < 0 || swap >= next.length) return;
        [next[idx], next[swap]] = [next[swap], next[idx]];
        setFields(next);
    };

    // Toggling applies immediately — no separate "Save" needed to turn
    // registration on/off. Field edits still use the Save button below.
    const handleToggle = async () => {
        const next = !enabled;
        setEnabled(next);
        setIsToggling(true);
        try {
            await upsertForm({
                eventId,
                enabled: next,
                fields: sanitizeFields(fields),
                maxCapacity: maxCapacity ? parseInt(maxCapacity, 10) : undefined,
            });
        } catch (err) {
            console.error(err);
            setEnabled(!next); // revert on failure
            alert("Failed to update registration status. Please try again.");
        } finally {
            setIsToggling(false);
        }
    };

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(registrationUrl);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    };

    const handleSave = async () => {
        const cleaned = sanitizeFields(fields);
        const validationError = findFormValidationError(cleaned);
        if (validationError) {
            setError(validationError);
            return;
        }
        setError(null);
        setFields(cleaned);
        setIsSaving(true);
        try {
            await upsertForm({
                eventId,
                enabled,
                fields: cleaned,
                maxCapacity: maxCapacity ? parseInt(maxCapacity, 10) : undefined,
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            console.error(err);
            setError("Failed to save registration form.");
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
                    onClick={handleToggle}
                    disabled={isToggling}
                    className={cn(
                        "relative w-11 h-6 rounded-full transition-colors focus:outline-none",
                        enabled ? "bg-[#257300]" : "bg-muted",
                        isToggling && "opacity-60"
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
                    {/* Shareable registration link */}
                    <div className="rounded-xl border border-[#257300]/25 bg-[#257300]/5 p-4">
                        <p className="text-sm font-medium text-foreground mb-1">Share the registration link</p>
                        <p className="text-xs text-muted-foreground mb-3">
                            Anyone with this link sees the event and the registration form opens automatically.
                        </p>
                        <div className="flex items-center gap-2">
                            <code className="text-xs flex-1 truncate bg-background px-2 py-2 rounded-lg border border-border font-mono">
                                {registrationUrl}
                            </code>
                            <Button type="button" variant="outline" size="sm" onClick={handleCopyLink} className="gap-1.5 h-8 flex-shrink-0">
                                {linkCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                                {linkCopied ? "Copied" : "Copy"}
                            </Button>
                            <Link href={`/events/${eventId}`} target="_blank" className="flex-shrink-0">
                                <Button type="button" variant="ghost" size="sm" className="gap-1.5 h-8">
                                    <ExternalLink className="w-3.5 h-3.5" /> View
                                </Button>
                            </Link>
                        </div>
                    </div>

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
                                                    {isChoiceField(field.type) && ` · ${(field.options ?? []).filter((o) => o.trim()).length} option${(field.options ?? []).filter((o) => o.trim()).length === 1 ? "" : "s"}`}
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
                                                            onChange={(e) => changeFieldType(field.id, e.target.value as FieldType)}
                                                            className="w-full border border-border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                                                        >
                                                            {FIELD_TYPES.map((t) => (
                                                                <option key={t.value} value={t.value}>{t.label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                {!isChoiceField(field.type) && (
                                                    <div>
                                                        <label className="text-xs text-muted-foreground">
                                                            Placeholder (optional)
                                                        </label>
                                                        <input
                                                            value={field.placeholder ?? ""}
                                                            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                                            className="w-full border border-border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300] mt-1"
                                                        />
                                                    </div>
                                                )}
                                                {isChoiceField(field.type) && (
                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <label className="text-xs text-muted-foreground">
                                                                Options — shown as checkboxes; registrants can pick more than one
                                                            </label>
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => addOption(field.id)}
                                                                className="gap-1 h-6 text-[11px] px-2"
                                                            >
                                                                <Plus className="w-3 h-3" /> Add Option
                                                            </Button>
                                                        </div>
                                                        <div className="space-y-1.5 mt-1.5">
                                                            {(field.options ?? []).length === 0 ? (
                                                                <p className="text-xs text-muted-foreground italic py-1">
                                                                    No options yet — add at least one.
                                                                </p>
                                                            ) : (
                                                                (field.options ?? []).map((opt, optIdx) => (
                                                                    <div key={optIdx} className="flex items-center gap-1.5">
                                                                        <div className="flex flex-col gap-0.5">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveOption(field.id, optIdx, -1)}
                                                                                disabled={optIdx === 0}
                                                                                aria-label="Move option up"
                                                                                className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                                                                            >
                                                                                <ChevronUp className="w-3 h-3" />
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveOption(field.id, optIdx, 1)}
                                                                                disabled={optIdx === (field.options ?? []).length - 1}
                                                                                aria-label="Move option down"
                                                                                className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                                                                            >
                                                                                <ChevronDown className="w-3 h-3" />
                                                                            </button>
                                                                        </div>
                                                                        <input
                                                                            value={opt}
                                                                            onChange={(e) => updateOption(field.id, optIdx, e.target.value)}
                                                                            placeholder={`Option ${optIdx + 1}`}
                                                                            className="flex-1 border border-border rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-[#257300]"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeOption(field.id, optIdx)}
                                                                            aria-label="Remove option"
                                                                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                                                        >
                                                                            <Trash2 className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                    <input
                                                        type="checkbox"
                                                        checked={field.required}
                                                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                                        className="accent-[#257300] w-4 h-4"
                                                    />
                                                    <span className="text-sm text-foreground">
                                                        Required field
                                                        {isChoiceField(field.type) && (
                                                            <span className="text-muted-foreground"> — at least one option must be selected</span>
                                                        )}
                                                    </span>
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
            {error && (
                <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                    {error}
                </p>
            )}
            <Button onClick={handleSave} disabled={isSaving} className="gap-2 w-full sm:w-auto">
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : saved ? "Saved ✓" : "Save Registration Form"}
            </Button>
        </div>
    );
}
