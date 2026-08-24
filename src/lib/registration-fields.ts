export const CHOICE_FIELD_TYPES = ["select", "checkbox"] as const;

export type ChoiceFieldType = (typeof CHOICE_FIELD_TYPES)[number];

export function isChoiceField(type: string): type is ChoiceFieldType {
    return (CHOICE_FIELD_TYPES as readonly string[]).includes(type);
}

/** Turn raw lines into a clean option list (no blanks or duplicates). */
export function parseOptions(raw: string): string[] {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const line of raw.split("\n")) {
        const opt = line.trim();
        if (!opt || seen.has(opt)) continue;
        seen.add(opt);
        out.push(opt);
    }
    return out;
}

export function sanitizeChoiceOptions(options: string[] | undefined): string[] {
    return parseOptions((options ?? []).join("\n"));
}

export function findFormValidationError(
    fields: { label: string; type: string; options?: string[] }[],
): string | null {
    for (const field of fields) {
        if (!field.label.trim()) return "Every field needs a label.";
        if (isChoiceField(field.type) && (field.options ?? []).length === 0) {
            return `"${field.label}" needs at least one option.`;
        }
    }
    return null;
}

/** Checkbox / dropdown answers are stored as string arrays. */
export function formatAnswer(value: unknown): string {
    if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean).join(", ");
    if (value === undefined || value === null) return "";
    return String(value);
}

/** Accept an array or a legacy single string and return unique allowed selections. */
export function normalizeChoiceValue(value: unknown, allowed: string[]): string[] {
    const raw = Array.isArray(value)
        ? value
        : typeof value === "string" && value.trim()
            ? [value]
            : [];
    const allowedSet = new Set(allowed);
    const seen = new Set<string>();
    const selected: string[] = [];
    for (const item of raw) {
        const opt = String(item).trim();
        if (!opt || seen.has(opt)) continue;
        if (allowedSet.size > 0 && !allowedSet.has(opt)) continue;
        seen.add(opt);
        selected.push(opt);
    }
    return selected;
}

export function choiceSelectionError(
    selected: string[],
    required: boolean,
    label: string,
): string | null {
    if (required && selected.length === 0) {
        return `Please select at least one option for ${label}`;
    }
    return null;
}
