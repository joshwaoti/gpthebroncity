import assert from "node:assert/strict";
import {
    choiceSelectionError,
    findFormValidationError,
    formatAnswer,
    isChoiceField,
    normalizeChoiceValue,
    parseOptions,
    sanitizeChoiceOptions,
} from "../src/lib/registration-fields.ts";

assert.equal(isChoiceField("select"), true);
assert.equal(isChoiceField("checkbox"), true);
assert.equal(isChoiceField("text"), false);

assert.deepEqual(
    parseOptions("Friday 4th Sept, 2026\n\nSaturday 5th Sept, 2026\nFriday 4th Sept, 2026\n"),
    ["Friday 4th Sept, 2026", "Saturday 5th Sept, 2026"],
);

assert.deepEqual(sanitizeChoiceOptions(["", "  A  ", "B", "A"]), ["A", "B"]);

assert.equal(
    findFormValidationError([{ label: "Days", type: "select", options: [] }]),
    '"Days" needs at least one option.',
);
assert.equal(
    findFormValidationError([{ label: "Days", type: "select", options: ["Fri", "Sat"] }]),
    null,
);

assert.deepEqual(
    normalizeChoiceValue(["Sat", "Fri", "Sun"], ["Fri", "Sat"]),
    ["Sat", "Fri"],
);
assert.deepEqual(normalizeChoiceValue("Fri", ["Fri", "Sat"]), ["Fri"]);
assert.deepEqual(normalizeChoiceValue(undefined, ["Fri", "Sat"]), []);

assert.equal(
    choiceSelectionError([], true, "Which days will you be attending?"),
    "Please select at least one option for Which days will you be attending?",
);
assert.equal(choiceSelectionError(["Fri"], true, "Days"), null);
assert.equal(choiceSelectionError(["Fri", "Sat"], true, "Days"), null);
assert.equal(choiceSelectionError([], false, "Days"), null);

assert.equal(formatAnswer(["Friday", "Saturday"]), "Friday, Saturday");
assert.equal(formatAnswer("Friday"), "Friday");

console.log("Registration form option and validation checks passed.");
