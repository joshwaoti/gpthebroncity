import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const HTML_CONTENT_PATTERN = /<(?:p|h[1-6]|ul|ol|li|blockquote|pre|table|img|br|hr|strong|em|u|s|del|mark|span|a)\b/i;

const BACKGROUND_PATTERN = /background-color\s*:\s*([^;]+)/i;
const NO_BACKGROUND = /^(?:transparent|none|inherit|initial|unset)$/i;
const PAPER_WHITE = /^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*[,)])/i;
const ZERO_ALPHA = /^rgba\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*0*(?:\.0+)?\s*\)$/i;

function isHighlighted(style: string | undefined) {
    const background = style?.match(BACKGROUND_PATTERN)?.[1]?.trim();
    if (!background) return false;

    return !NO_BACKGROUND.test(background)
        && !PAPER_WHITE.test(background)
        && !ZERO_ALPHA.test(background);
}

const sanitizeOptions: sanitizeHtml.IOptions = {
    // `span` is deliberately absent: it only ever carried pasted presentation.
    // sanitize-html unwraps disallowed tags, so the text inside survives.
    allowedTags: [
        "p", "h1", "h2", "h3", "h4", "h5", "h6", "br", "hr",
        "strong", "b", "em", "i", "u", "s", "strike", "del", "mark",
        "a", "ul", "ol", "li", "blockquote", "pre", "code", "img",
        "table", "thead", "tbody", "tfoot", "tr", "th", "td",
    ],
    allowedAttributes: {
        "*": ["style"],
        a: ["href", "target", "rel", "title"],
        img: ["src", "alt", "title", "width", "height"],
        ol: ["start", "type"],
        li: ["value"],
        th: ["colspan", "rowspan", "colwidth"],
        td: ["colspan", "rowspan", "colwidth"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {
        img: ["http", "https", "data"],
    },
    // Alignment is a structural choice the author makes; colour, font family and
    // font size belong to the theme. Inline styles outrank every stylesheet
    // rule, so anything left here silently overrides light/dark mode.
    allowedStyles: {
        "*": {
            "text-align": [/^(?:left|right|center|justify)$/i],
        },
    },
    transformTags: {
        a: sanitizeHtml.simpleTransform("a", {
            rel: "noopener noreferrer",
            target: "_blank",
        }),
        // Google Docs wraps an entire copied document in
        // `<b style="font-weight:normal">`. Retagging it as a disallowed span
        // unwraps it instead of bolding the whole post.
        b: (tagName, attribs) => /font-weight\s*:\s*normal/i.test(attribs.style ?? "")
            ? { tagName: "span", attribs: {} }
            : { tagName, attribs },
        // Word and Google Docs express a highlight as a background colour on a
        // span. Promote it to a semantic <mark> so the intent survives while the
        // theme picks the actual colour; every other span is unwrapped.
        span: (tagName, attribs) => isHighlighted(attribs.style)
            ? { tagName: "mark", attribs: {} }
            : { tagName, attribs },
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
 * Removes unsafe markup and any inline presentation, leaving the structure the
 * author intended and letting the theme own colour and typography. Used on
 * paste so the editor shows what the published post will actually look like.
 */
export function sanitizeBlogHtml(html: string) {
    return sanitizeHtml(html, sanitizeOptions);
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

    return sanitizeBlogHtml(html);
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
