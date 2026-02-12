/**
 * @fileoverview Tests for the balloon module.
 *
 * ## Teaching concepts demonstrated
 *
 * - **Vitest**: Modern test runner that integrates with Vite
 * - **describe()**: Groups related tests into a test suite
 * - **it()**: Defines an individual test case (alias for `test()`)
 * - **expect()**: Creates an assertion about a value
 * - **Matchers**: .toBe() for exact match, .toContain() for partial match
 *
 * ## Running tests
 *
 * npm test          - Watch mode (re-runs on file changes)
 * npm test -- --run - Run once and exit
 *
 * @see https://vitest.dev/guide/
 */

import { describe, it, expect } from "vitest";
import { say, think } from "../src/lib/balloon.js";

/**
 * Test suite for the say() function.
 * describe() groups tests - the string is shown in test output.
 */
describe("say", () => {
  /**
   * it() defines a single test case.
   * The string describes what behavior we're testing.
   */
  it("wraps single line in speech balloon", () => {
    const result = say("Hi!");

    // .toBe() checks for exact equality (like ===)
    // Use for primitives: strings, numbers, booleans
    expect(result).toBe(" _____\n< Hi! >\n -----");
  });

  it("wraps multiple lines with correct delimiters", () => {
    // Two-line messages use / \ for first and last lines
    const result = say("AB\nCDE");
    expect(result).toBe(" _____\n/ AB  \\\n\\ CDE /\n -----");
  });

  it("handles three or more lines", () => {
    const result = say("A\nB\nC");

    // .toContain() checks if string includes a substring
    // Useful when you don't need to match the entire output
    expect(result).toContain("/ A \\"); // First line uses / \
    expect(result).toContain("| B |"); // Middle lines use | |
    expect(result).toContain("\\ C /"); // Last line uses \ /
  });

  it("respects wrap parameter", () => {
    // Second argument sets max line width
    const result = say("ABCDEF", 3);
    expect(result).toContain("ABC");
    expect(result).toContain("DEF");
  });
});

/**
 * Test suite for the think() function.
 * Similar to say() but uses parentheses for thought bubbles.
 */
describe("think", () => {
  it("wraps single line in thought balloon", () => {
    const result = think("Hi!");
    expect(result).toBe(" _____\n( Hi! )\n -----");
  });

  it("uses parentheses for all lines", () => {
    const result = think("A\nB\nC");

    // Thought balloons use ( ) for every line
    expect(result).toContain("( A )");
    expect(result).toContain("( B )");
    expect(result).toContain("( C )");
  });
});
