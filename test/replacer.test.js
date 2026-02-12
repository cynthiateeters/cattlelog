/**
 * @fileoverview Tests for the replacer module.
 *
 * ## Teaching concepts demonstrated
 *
 * - **Template replacement**: Testing string substitution logic
 * - **Edge cases**: Special characters like $ need escaping
 * - **Integration-style test**: Last test uses realistic input
 *
 * ## The replacer module
 *
 * ASCII art templates use placeholders:
 * - $thoughts - The thought/speech bubble connector (\ or o)
 * - $eyes - Both eyes together (e.g., "oo")
 * - $eye - Single eye (used twice for left/right)
 * - $tongue - The tongue string
 * - ${eyes}, ${tongue} - Alternative syntax
 */

import { describe, it, expect } from "vitest";
import { replacePlaceholders } from "../src/lib/replacer.js";

describe("replacePlaceholders", () => {
  /**
   * Basic placeholder tests.
   * Each test verifies one placeholder type works correctly.
   */
  it("replaces $thoughts placeholder", () => {
    const result = replacePlaceholders("$thoughts", {
      thoughts: "\\",
      eyes: "oo",
      tongue: "  ",
    });
    expect(result).toBe("\\");
  });

  it("replaces $eyes placeholder", () => {
    const result = replacePlaceholders("($eyes)", {
      thoughts: "\\",
      eyes: "oo",
      tongue: "  ",
    });
    expect(result).toBe("(oo)");
  });

  it("replaces $tongue placeholder", () => {
    const result = replacePlaceholders("$tongue", {
      thoughts: "\\",
      eyes: "oo",
      tongue: "U ",
    });
    expect(result).toBe("U ");
  });

  /**
   * Alternative ${} syntax from original cowsay.
   */
  it("replaces ${eyes} placeholder", () => {
    const result = replacePlaceholders("${eyes}", {
      thoughts: "\\",
      eyes: "@@",
      tongue: "  ",
    });
    expect(result).toBe("@@");
  });

  /**
   * Individual eye replacement.
   * Some cow art uses $eye twice for asymmetric eyes.
   */
  it("replaces individual $eye placeholders", () => {
    const result = replacePlaceholders("$eye $eye", {
      thoughts: "\\",
      eyes: "oO", // Left eye 'o', right eye 'O'
      tongue: "  ",
    });
    expect(result).toBe("o O");
  });

  /**
   * Edge case: $ is special in regex replacement.
   * The greedy mode uses "$$" for eyes - must not break!
   */
  it("handles dollar signs in eyes", () => {
    const result = replacePlaceholders("($eyes)", {
      thoughts: "\\",
      eyes: "$$", // Greedy mode
      tongue: "  ",
    });
    expect(result).toBe("($$)");
  });

  /**
   * Integration test with realistic ASCII art input.
   * Tests multiple placeholders working together.
   */
  it("replaces multiple placeholders in cow art", () => {
    const art = "$thoughts ^__^\n ($eyes)\n  $tongue";
    const result = replacePlaceholders(art, {
      thoughts: "\\",
      eyes: "oo",
      tongue: "  ",
    });

    // Verify key parts are present
    expect(result).toContain("\\");
    expect(result).toContain("oo");
  });
});
