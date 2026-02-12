/**
 * @fileoverview Tests for the faces module.
 *
 * ## Teaching concepts demonstrated
 *
 * - **Testing objects**: Accessing properties with dot notation
 * - **Object matchers**: .toHaveProperty() checks if key exists
 * - **Array matchers**: .toHaveLength() checks array/object size
 * - **Multiple assertions**: One test can have multiple expect() calls
 *
 * ## Test organization
 *
 * Tests are organized by what they're testing:
 * - getFace() function behavior
 * - modes object structure
 */

import { describe, it, expect } from "vitest";
import { getFace, modes } from "../src/lib/faces.js";

describe("getFace", () => {
  /**
   * Testing default behavior when no options provided.
   * Multiple expect() calls verify different parts of the result.
   */
  it("returns default eyes and tongue", () => {
    const face = getFace({});

    // Test the returned object's properties
    expect(face.eyes).toBe("oo");
    expect(face.tongue).toBe("  "); // Two spaces
  });

  /**
   * Testing predefined modes.
   * Each mode (b, d, g, p, s, t, w, y) sets specific eyes/tongue.
   */
  it("returns borg mode", () => {
    const face = getFace({ b: true });
    expect(face.eyes).toBe("==");
  });

  it("returns dead mode", () => {
    const face = getFace({ d: true });
    expect(face.eyes).toBe("xx");
    expect(face.tongue).toBe("U "); // Tongue sticking out
  });

  it("returns greedy mode", () => {
    const face = getFace({ g: true });
    expect(face.eyes).toBe("$$"); // Money eyes!
  });

  /**
   * Testing custom options override defaults.
   */
  it("allows custom eyes", () => {
    const face = getFace({ e: "@@" });
    expect(face.eyes).toBe("@@");
  });

  it("allows custom tongue", () => {
    const face = getFace({ T: "U " });
    expect(face.tongue).toBe("U ");
  });
});

/**
 * Testing the exported modes object.
 * This verifies the module's public API.
 */
describe("modes", () => {
  it("exports all 8 modes", () => {
    // .toHaveLength() works on arrays and Object.keys()
    expect(Object.keys(modes)).toHaveLength(8);

    // .toHaveProperty() checks if object has a specific key
    expect(modes).toHaveProperty("b"); // Borg
    expect(modes).toHaveProperty("d"); // Dead
    expect(modes).toHaveProperty("g"); // Greedy
    expect(modes).toHaveProperty("p"); // Paranoid
    expect(modes).toHaveProperty("s"); // Stoned
    expect(modes).toHaveProperty("t"); // Tired
    expect(modes).toHaveProperty("w"); // Wired
    expect(modes).toHaveProperty("y"); // Young
  });
});
