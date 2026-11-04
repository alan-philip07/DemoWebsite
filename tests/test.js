const test = require("node:test");
const assert = require("node:assert");
const { addTask } = require("../app");

test("Valid task name is accepted", () => {
    assert.strictEqual(addTask("Complete project"), true);
});

test("Empty task name is rejected", () => {
    assert.strictEqual(addTask(""), false);
});

test("Whitespace-only task name is rejected", () => {
    assert.strictEqual(addTask("   "), false);
});

test("Task name with surrounding spaces is accepted", () => {
    assert.strictEqual(addTask("  Test application  "), true);
});