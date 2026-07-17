import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const HTML_CONTENT_PATTERN = /<(?:p|h[1-6]|ul|ol|li|blockquote|pre|table|img|br|hr|strong|em|u|s|del|mark|span|a)\b/i;

const colorPattern = /^(?:#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%]+\)|[a-z]+)$/i;
const sizePattern = /^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/i;
const lineHeightPattern = /^(?:normal|\d+(?:\.\d+)?(?:px|pt|em|rem|%)?)$/i;

const sanitizeOptions: sanitizeHtml.IOptions = {
    allowedTags: [
        "p", "h1", "h2", "h3", "h4", "h5", "h6", "br", "hr",
        "strong", "b", "em", "i", "u", "s", "strike", "del", "mark", "span",
        "a", "ul", "ol", "li", "blockquote", "pre", "code", "img",
        "table", "thead", "tbody", "tfoot", "tr", "th", "td",
    ],
    allowedAttributes: {
        "*": ["style"],
        a: ["href", "target", "rel", "title"],
        img: ["src", "alt", "title", "width", "height"],
        ol: ["start", "type"],
        li: ["value"],
        mark: ["data-color"],
        table: ["style"],
        th: ["colspan", "rowspan", "colwidth", "style"],
        td: ["colspan", "rowspan", "colwidth", "style"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {
        img: ["http", "https", "data"],
    },
    allowedStyles: {
        "*": {
            color: [colorPattern],
            "background-color": [colorPattern],
            "font-family": [/^[\w\s"',-]+$/],
            "font-size": [sizePattern],
            "line-height": [lineHeightPattern],
            "text-align": [/^(?:left|right|center|justify)$/i],
        },
    },
    transformTags: {
        a: sanitizeHtml.simpleTransform("a", {
            rel: "noopener noreferrer",
            target: "_blank",
        }),
    },
};

function markdownToHtml(content: string) {
    return marked.parse(content, {
        async: false,
        breaks: true,
        gfm: true,
    }) as string;
}

/**
 * Converts legacy Markdown/plain-text posts to HTML and removes unsupported or
 * unsafe markup. New rich-text posts already arrive as HTML and pass through the
 * same allow-list before they are persisted or rendered.
 */
export function sanitizeBlogContent(content: string) {
    const trimmed = content.trim();
    if (!trimmed) return "";

    const html = HTML_CONTENT_PATTERN.test(trimmed)
        ? trimmed
        : markdownToHtml(trimmed);

    return sanitizeHtml(html, sanitizeOptions);
}

export function isBlogContentEmpty(content: string) {
    const sanitized = sanitizeBlogContent(content);
    if (/<img\b/i.test(sanitized)) return false;

    const text = sanitized
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;|&#160;/gi, " ")
        .trim();

    return text.length === 0;
}
