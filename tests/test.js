const test = require("node:test");
const assert = require("node:assert");
const { isValidTaskName } = require("../task-utils");

test("Valid task name is accepted", () => {
    assert.strictEqual(isValidTaskName("Complete project"), true);
});

test("Empty task name is rejected", () => {
    assert.strictEqual(isValidTaskName(""), false);
});

test("Whitespace-only task name is rejected", () => {
    assert.strictEqual(isValidTaskName("   "), false);
});

test("Task name with surrounding spaces is accepted", () => {
    assert.strictEqual(isValidTaskName("  Test application  "), true);
});