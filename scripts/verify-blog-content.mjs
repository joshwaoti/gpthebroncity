import assert from "node:assert/strict";
import { isBlogContentEmpty, sanitizeBlogContent, sanitizeBlogHtml } from "../src/lib/blog-content.ts";

const markdown = sanitizeBlogContent("# Heading\n\n**Bold** and <script>alert(1)</script>");
assert.match(markdown, /<h1>Heading<\/h1>/);
assert.match(markdown, /<strong>Bold<\/strong>/);
assert.doesNotMatch(markdown, /<script/i);

const richText = sanitizeBlogContent(
    '<p style="text-align: center"><u>Kept</u><a href="javascript:alert(1)">unsafe</a></p>',
);
assert.match(richText, /text-align:\s*center/);
assert.match(richText, /<u>Kept<\/u>/);
assert.doesNotMatch(richText, /javascript:/i);

// Content pasted from Google Docs / Word carries inline presentation on every
// span. Inline styles outrank the theme stylesheet, so a hard-coded
// `color: rgb(0, 0, 0)` renders as black-on-black in dark mode. The theme owns
// colour and typography: only structural styling survives.
const googleDocsParagraph = sanitizeBlogContent(
    '<p style="text-align:justify"><span style="background-color:transparent;color:rgb(0, 0, 0);'
    + 'font-family:&quot;Times New Roman&quot;;font-size:12pt">Body copy</span></p>',
);
assert.match(googleDocsParagraph, /Body copy/);
assert.match(googleDocsParagraph, /text-align:\s*justify/);
assert.doesNotMatch(googleDocsParagraph, /color\s*:/i);
assert.doesNotMatch(googleDocsParagraph, /font-family\s*:/i);
assert.doesNotMatch(googleDocsParagraph, /font-size\s*:/i);
assert.doesNotMatch(googleDocsParagraph, /<span/i);

// Stripping presentation must not flatten the structure or the semantic marks
// wrapped inside those spans.
const googleDocsHeading = sanitizeBlogHtml(
    '<h1 style="text-align:justify"><span style="color:rgb(191, 144, 0);font-size:16pt">'
    + "<strong>Summary</strong></span></h1>",
);
assert.match(googleDocsHeading, /^<h1 style="text-align:justify"><strong>Summary<\/strong><\/h1>$/);

// Google Docs wraps whole documents in <b style="font-weight:normal">, which
// would otherwise bold the entire post.
const googleDocsWrapper = sanitizeBlogHtml(
    '<b style="font-weight:normal" id="docs-internal-guid-1"><p>Not bold</p></b>',
);
assert.match(googleDocsWrapper, /Not bold/);
assert.doesNotMatch(googleDocsWrapper, /<b[\s>]/i);

// Real emphasis still survives.
assert.match(sanitizeBlogHtml("<p><b>Bold</b></p>"), /<b>Bold<\/b>/);

// Highlights stay semantic so the theme can colour them in light and dark mode.
const highlighted = sanitizeBlogHtml(
    '<p><mark data-color="#fff2a8" style="background-color:#fff2a8">Noted</mark></p>',
);
assert.match(highlighted, /<mark>Noted<\/mark>/);

// A highlight pasted from Google Docs arrives as a background colour on a span.
// The intent is kept as a <mark>; the source colour is not.
const pastedHighlight = sanitizeBlogHtml(
    '<p><span style="background-color:rgb(255, 255, 0);color:rgb(0, 0, 0)">Emphasised</span></p>',
);
assert.match(pastedHighlight, /<mark>Emphasised<\/mark>/);

// Docs sets `background-color:transparent` on nearly every span; that is not a
// highlight and must not litter the post with empty marks.
for (const background of ["transparent", "rgb(255, 255, 255)", "#ffffff", "rgba(0, 0, 0, 0)"]) {
    const notHighlighted = sanitizeBlogHtml(
        `<p><span style="background-color:${background};color:rgb(0, 0, 0)">Plain</span></p>`,
    );
    assert.equal(notHighlighted, "<p>Plain</p>", `expected no mark for ${background}`);
}

// A stripped style attribute must not be left behind as an empty husk.
assert.doesNotMatch(sanitizeBlogHtml('<p style="color:red">x</p>'), /style=/);

// Unwrapping spans must not make real content look empty.
assert.equal(isBlogContentEmpty('<p><span style="color:red">Hi</span></p>'), false);
assert.equal(isBlogContentEmpty("<p> </p>"), true);
assert.equal(isBlogContentEmpty("<p>Real content</p>"), false);

console.log("Blog content conversion and sanitization checks passed.");
