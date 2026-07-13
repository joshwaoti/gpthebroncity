"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { useRouter, useSearchParams } from "next/navigation";
import { X, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Field {
    id: string;
    label: string;
    type: "text" | "email" | "phone" | "number" | "textarea" | "select";
    required: boolean;
    options?: string[];
    placeholder?: string;
}

interface Props {
    eventId: Id<"events">;
    eventTitle: string;
    isOpen: boolean;
    onClose: () => void;
}

type Step = "form" | "success" | "full" | "duplicate";

export function RegistrationModal({ eventId, eventTitle, isOpen, onClose }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const form = useQuery(api.eventRegistrations.getForm, { eventId });
    const regCount = useQuery(api.eventRegistrations.getRegistrationCount, { eventId });
    const submitReg = useMutation(api.eventRegistrations.submit);

    const [values, setValues] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [step, setStep] = useState<Step>("form");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && searchParams.get("register") === "true") {
            const url = new URL(window.location.href);
            url.searchParams.delete("register");
            router.replace(url.toString(), { scroll: false });
        }
    }, [isOpen, searchParams, router]);

    if (!isOpen) return null;

    const fields: Field[] = form?.fields ?? [];
    const isFull = !!form?.maxCapacity && (regCount?.confirmed ?? 0) >= form.maxCapacity;

    const setValue = (id: string, val: string) => {
        setValues((v) => ({ ...v, [id]: val }));
        if (errors[id]) setErrors((e) => { const ne = { ...e }; delete ne[id]; return ne; });
    };

    const validate = () => {
        const errs: Record<string, string> = {};
        for (const field of fields) {
            if (field.required && !values[field.id]?.trim()) {
                errs[field.id] = `${field.label} is required`;
            }
            if (field.type === "email" && values[field.id] && !/\S+@\S+\.\S+/.test(values[field.id])) {
                errs[field.id] = "Please enter a valid email address";
            }
        }
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setIsSubmitting(true);
        try {
            const result = await submitReg({ eventId, data: values });
            if (result.status === "full") { setStep("full"); return; }
            if (result.status === "duplicate") { setStep("duplicate"); return; }
            if (result.status !== "ok") {
                setErrors({ _form: "Registration is not available for this event right now." });
                return;
            }
            setStep("success");
        } catch (err) {
            console.error(err);
            setErrors({ _form: "Something went wrong submitting your registration. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setValues({});
        setErrors({});
        setStep("form");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

            {/* Modal */}
            <div className="relative bg-background rounded-2xl border border-border shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-border">
                    <div>
                        <h2 className="text-lg font-bold text-foreground">Register for Event</h2>
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{eventTitle}</p>
                    </div>
                    <button type="button" onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors ml-4 flex-shrink-0">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Loading */}
                    {form === undefined && (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    )}

                    {/* Event full */}
                    {step === "full" || (form !== undefined && isFull && step === "form") ? (
                        <div className="text-center py-6">
                            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-foreground mb-2">Registration Full</h3>
                            <p className="text-sm text-muted-foreground">
                                This event has reached its maximum capacity. Please check back later.
                            </p>
                            <Button onClick={handleClose} className="mt-5">Close</Button>
                        </div>
                    ) : step === "duplicate" ? (
                        <div className="text-center py-6">
                            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-foreground mb-2">Already Registered</h3>
                            <p className="text-sm text-muted-foreground">
                                It looks like you've already registered for this event with that email address.
                            </p>
                            <Button onClick={handleClose} className="mt-5">Close</Button>
                        </div>
                    ) : step === "success" ? (
                        <div className="text-center py-6">
                            <CheckCircle2 className="w-14 h-14 text-[#257300] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-foreground mb-2">You're Registered!</h3>
                            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                Thank you for registering for <strong>{eventTitle}</strong>. We look forward to seeing you!
                            </p>
                            <Button onClick={handleClose} className="mt-6">Done</Button>
                        </div>
                    ) : form ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {fields.length === 0 ? (
                                <div className="text-sm text-center text-muted-foreground py-4">
                                    No form fields configured. Click Register to confirm your spot.
                                </div>
                            ) : (
                                fields.map((field) => (
                                    <div key={field.id}>
                                        <label className="text-sm font-medium text-foreground">
                                            {field.label}
                                            {field.required && <span className="text-destructive ml-1">*</span>}
                                        </label>
                                        {field.type === "textarea" ? (
                                            <textarea
                                                rows={3}
                                                value={values[field.id] ?? ""}
                                                onChange={(e) => setValue(field.id, e.target.value)}
                                                placeholder={field.placeholder}
                                                className={cn(
                                                    "w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 mt-1 resize-none",
                                                    errors[field.id]
                                                        ? "border-destructive focus:ring-destructive"
                                                        : "border-border focus:ring-[#257300]"
                                                )}
                                            />
                                        ) : field.type === "select" ? (
                                            <select
                                                value={values[field.id] ?? ""}
                                                onChange={(e) => setValue(field.id, e.target.value)}
                                                className={cn(
                                                    "w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 mt-1",
                                                    errors[field.id]
                                                        ? "border-destructive focus:ring-destructive"
                                                        : "border-border focus:ring-[#257300]"
                                                )}
                                            >
                                                <option value="">Select an option…</option>
                                                {(field.options ?? []).map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={field.type}
                                                value={values[field.id] ?? ""}
                                                onChange={(e) => setValue(field.id, e.target.value)}
                                                placeholder={field.placeholder}
                                                className={cn(
                                                    "w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 mt-1",
                                                    errors[field.id]
                                                        ? "border-destructive focus:ring-destructive"
                                                        : "border-border focus:ring-[#257300]"
                                                )}
                                            />
                                        )}
                                        {errors[field.id] && (
                                            <p className="text-xs text-destructive mt-1">{errors[field.id]}</p>
                                        )}
                                    </div>
                                ))
                            )}

                            {form.maxCapacity && (
                                <p className="text-xs text-muted-foreground text-right">
                                    {Math.max(0, form.maxCapacity - (regCount?.confirmed ?? 0))} spots remaining
                                </p>
                            )}

                            {errors._form && (
                                <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                                    {errors._form}
                                </p>
                            )}

                            <Button type="submit" disabled={isSubmitting} className="w-full gap-2 mt-2">
                                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isSubmitting ? "Registering…" : "Register Now"}
                            </Button>
                        </form>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
