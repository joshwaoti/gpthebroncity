"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { TableKit } from "@tiptap/extension-table";
import Placeholder from "@tiptap/extension-placeholder";
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Code2,
    Eraser,
    ImagePlus,
    Italic,
    Link2,
    List,
    ListOrdered,
    Minus,
    Quote,
    Redo2,
    Strikethrough,
    Table2,
    Underline,
    Undo2,
    Unlink2,
} from "lucide-react";
import { sanitizeBlogContent } from "@/lib/blog-content";

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    ariaLabel?: string;
}

interface ToolbarButtonProps {
    label: string;
    onClick: () => void;
    icon: React.ComponentType<{ className?: string }>;
    active?: boolean;
    disabled?: boolean;
}

const createEditorExtensions = (placeholder: string) => [
    StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        link: {
            autolink: true,
            defaultProtocol: "https",
            linkOnPaste: true,
            openOnClick: false,
            HTMLAttributes: {
                rel: "noopener noreferrer",
                target: "_blank",
            },
        },
    }),
    Image.configure({
        allowBase64: true,
    }),
    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),
    Highlight.configure({
        multicolor: true,
    }),
    TextStyleKit,
    TableKit.configure({
        table: {
            resizable: true,
        },
    }),
    Placeholder.configure({
        placeholder: ({ node }) => node.type.name === "heading"
            ? "Heading"
            : placeholder,
    }),
];

function ToolbarButton({ label, onClick, icon: Icon, active = false, disabled = false }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            disabled={disabled}
            onMouseDown={event => event.preventDefault()}
            onClick={onClick}
            className={`rich-text-toolbar__button ${active ? "rich-text-toolbar__button--active" : ""}`}
        >
            <Icon className="h-4 w-4" />
        </button>
    );
}

function normalizeUrl(url: string) {
    const trimmed = url.trim();
    if (!trimmed || /^(?:https?:|mailto:|tel:|#)/i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
}

function inputColor(value: unknown, fallback: string) {
    return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value)
        ? value
        : fallback;
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = "Start writing or paste formatted content here…",
    ariaLabel = "Blog post content",
}: RichTextEditorProps) {
    const onChangeRef = useRef(onChange);
    const lastEmittedValue = useRef("");
    const [initialContent] = useState(() => sanitizeBlogContent(value) || "<p></p>");

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    const extensions = useMemo(
        () => createEditorExtensions(placeholder),
        [placeholder],
    );

    const editor = useEditor({
        extensions,
        content: initialContent,
        immediatelyRender: false,
        shouldRerenderOnTransaction: true,
        editorProps: {
            attributes: {
                class: "rich-text-editor__content",
                "aria-label": ariaLabel,
            },
        },
        onUpdate: ({ editor: currentEditor }) => {
            const html = currentEditor.getHTML();
            lastEmittedValue.current = html;
            onChangeRef.current(html);
        },
    });

    useEffect(() => {
        if (!editor || value === lastEmittedValue.current) return;

        const normalizedValue = sanitizeBlogContent(value) || "<p></p>";
        if (normalizedValue !== editor.getHTML()) {
            editor.commands.setContent(normalizedValue, { emitUpdate: false });
        }
    }, [editor, value]);

    if (!editor) {
        return <div className="rich-text-editor rich-text-editor--loading" aria-label="Loading editor" />;
    }

    const blockType = editor.isActive("heading", { level: 1 }) ? "h1"
        : editor.isActive("heading", { level: 2 }) ? "h2"
            : editor.isActive("heading", { level: 3 }) ? "h3"
                : editor.isActive("heading", { level: 4 }) ? "h4"
                    : "paragraph";

    const textStyle = editor.getAttributes("textStyle");
    const highlight = editor.getAttributes("highlight");

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href as string | undefined;
        const enteredUrl = window.prompt("Paste or enter a link", previousUrl ?? "https://");
        if (enteredUrl === null) return;

        const href = normalizeUrl(enteredUrl);
        if (!href) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    };

    const addImage = () => {
        const enteredUrl = window.prompt("Paste the image URL");
        if (!enteredUrl?.trim()) return;
        const alt = window.prompt("Describe the image for accessibility (optional)") ?? "";

        editor.chain().focus().setImage({
            src: enteredUrl.trim(),
            alt: alt.trim(),
        }).run();
    };

    return (
        <div className="rich-text-editor">
            <div className="rich-text-toolbar" role="toolbar" aria-label="Text formatting">
                <div className="rich-text-toolbar__group">
                    <select
                        aria-label="Text style"
                        title="Text style"
                        value={blockType}
                        onChange={event => {
                            const next = event.target.value;
                            if (next === "paragraph") {
                                editor.chain().focus().setParagraph().run();
                                return;
                            }
                            const level = Number(next.slice(1)) as 1 | 2 | 3 | 4;
                            editor.chain().focus().setHeading({ level }).run();
                        }}
                        className="rich-text-toolbar__select rich-text-toolbar__select--block"
                    >
                        <option value="paragraph">Paragraph</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="h4">Heading 4</option>
                    </select>
                    <select
                        aria-label="Font family"
                        title="Font family"
                        value={(textStyle.fontFamily as string | undefined) ?? ""}
                        onChange={event => {
                            const family = event.target.value;
                            if (family) editor.chain().focus().setFontFamily(family).run();
                            else editor.chain().focus().unsetFontFamily().run();
                        }}
                        className="rich-text-toolbar__select"
                    >
                        <option value="">Default font</option>
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Courier New">Courier New</option>
                    </select>
                    <select
                        aria-label="Font size"
                        title="Font size"
                        value={(textStyle.fontSize as string | undefined) ?? ""}
                        onChange={event => {
                            const size = event.target.value;
                            if (size) editor.chain().focus().setFontSize(size).run();
                            else editor.chain().focus().unsetFontSize().run();
                        }}
                        className="rich-text-toolbar__select rich-text-toolbar__select--compact"
                    >
                        <option value="">Size</option>
                        <option value="12px">12</option>
                        <option value="14px">14</option>
                        <option value="16px">16</option>
                        <option value="18px">18</option>
                        <option value="20px">20</option>
                        <option value="24px">24</option>
                        <option value="30px">30</option>
                        <option value="36px">36</option>
                    </select>
                    <select
                        aria-label="Line spacing"
                        title="Line spacing"
                        value={(textStyle.lineHeight as string | undefined) ?? ""}
                        onChange={event => {
                            const height = event.target.value;
                            if (height) editor.chain().focus().setLineHeight(height).run();
                            else editor.chain().focus().unsetLineHeight().run();
                        }}
                        className="rich-text-toolbar__select rich-text-toolbar__select--compact"
                    >
                        <option value="">Spacing</option>
                        <option value="1">1.0</option>
                        <option value="1.25">1.25</option>
                        <option value="1.5">1.5</option>
                        <option value="1.75">1.75</option>
                        <option value="2">2.0</option>
                    </select>
                </div>

                <div className="rich-text-toolbar__group">
                    <ToolbarButton label="Bold" icon={Bold} active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} />
                    <ToolbarButton label="Italic" icon={Italic} active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} />
                    <ToolbarButton label="Underline" icon={Underline} active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} />
                    <ToolbarButton label="Strikethrough" icon={Strikethrough} active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} />
                    <label className="rich-text-toolbar__color" title="Text color">
                        <span>A</span>
                        <input
                            type="color"
                            aria-label="Text color"
                            value={inputColor(textStyle.color, "#1a1a1a")}
                            onChange={event => editor.chain().focus().setColor(event.target.value).run()}
                        />
                    </label>
                    <label className="rich-text-toolbar__color rich-text-toolbar__color--highlight" title="Highlight color">
                        <span>A</span>
                        <input
                            type="color"
                            aria-label="Highlight color"
                            value={inputColor(highlight.color, "#fff2a8")}
                            onChange={event => editor.chain().focus().setHighlight({ color: event.target.value }).run()}
                        />
                    </label>
                </div>

                <div className="rich-text-toolbar__group">
                    <ToolbarButton label="Align left" icon={AlignLeft} active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} />
                    <ToolbarButton label="Align center" icon={AlignCenter} active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} />
                    <ToolbarButton label="Align right" icon={AlignRight} active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} />
                    <ToolbarButton label="Justify" icon={AlignJustify} active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()} />
                    <ToolbarButton label="Bulleted list" icon={List} active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} />
                    <ToolbarButton label="Numbered list" icon={ListOrdered} active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
                    <ToolbarButton label="Block quote" icon={Quote} active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
                    <ToolbarButton label="Code block" icon={Code2} active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} />
                </div>

                <div className="rich-text-toolbar__group">
                    <ToolbarButton label="Add or edit link" icon={Link2} active={editor.isActive("link")} onClick={setLink} />
                    <ToolbarButton label="Remove link" icon={Unlink2} disabled={!editor.isActive("link")} onClick={() => editor.chain().focus().unsetLink().run()} />
                    <ToolbarButton label="Insert image" icon={ImagePlus} onClick={addImage} />
                    <ToolbarButton label="Horizontal line" icon={Minus} onClick={() => editor.chain().focus().setHorizontalRule().run()} />
                    <ToolbarButton label="Insert table" icon={Table2} onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
                    <ToolbarButton label="Clear formatting" icon={Eraser} onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} />
                </div>

                {editor.isActive("table") && (
                    <div className="rich-text-toolbar__group rich-text-toolbar__table-tools" aria-label="Table tools">
                        <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()}>Row +</button>
                        <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()}>Column +</button>
                        <button type="button" onClick={() => editor.chain().focus().deleteRow().run()}>Row −</button>
                        <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()}>Column −</button>
                        <button type="button" className="text-red-600" onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</button>
                    </div>
                )}

                <div className="rich-text-toolbar__group rich-text-toolbar__history">
                    <ToolbarButton label="Undo" icon={Undo2} disabled={!editor.can().chain().focus().undo().run()} onClick={() => editor.chain().focus().undo().run()} />
                    <ToolbarButton label="Redo" icon={Redo2} disabled={!editor.can().chain().focus().redo().run()} onClick={() => editor.chain().focus().redo().run()} />
                </div>
            </div>

            <EditorContent editor={editor} />
            <div className="rich-text-editor__footer">
                <span>Formatted paste supported from Word, Google Docs, websites, and other rich-text sources.</span>
                <span>{editor.getText().length} characters</span>
            </div>
        </div>
    );
}
