import assert from "node:assert/strict";
import { isBlogContentEmpty, sanitizeBlogContent } from "../src/lib/blog-content.ts";

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

assert.equal(isBlogContentEmpty("<p> </p>"), true);
assert.equal(isBlogContentEmpty("<p>Real content</p>"), false);

console.log("Blog content conversion and sanitization checks passed.");
