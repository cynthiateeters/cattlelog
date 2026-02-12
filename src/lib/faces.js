/**
 * Predefined face modes for ASCII art creatures.
 * Each mode defines eyes and tongue expressions.
 */
const modes = {
  b: { eyes: "==", tongue: "  " }, // Borg
  d: { eyes: "xx", tongue: "U " }, // Dead
  g: { eyes: "$$", tongue: "  " }, // Greedy
  p: { eyes: "@@", tongue: "  " }, // Paranoid
  s: { eyes: "**", tongue: "U " }, // Stoned
  t: { eyes: "--", tongue: "  " }, // Tired
  w: { eyes: "OO", tongue: "  " }, // Wired
  y: { eyes: "..", tongue: "  " }, // Young
};

/**
 * Get face features based on options.
 *
 * @param {Object} options - Face configuration
 * @param {boolean} [options.b] - Borg mode
 * @param {boolean} [options.d] - Dead mode
 * @param {boolean} [options.g] - Greedy mode
 * @param {boolean} [options.p] - Paranoid mode
 * @param {boolean} [options.s] - Stoned mode
 * @param {boolean} [options.t] - Tired mode
 * @param {boolean} [options.w] - Wired mode
 * @param {boolean} [options.y] - Young mode
 * @param {string} [options.e] - Custom eyes (2 chars)
 * @param {string} [options.T] - Custom tongue (2 chars)
 * @returns {{ eyes: string, tongue: string }}
 */
export function getFace(options) {
  for (const mode in modes) {
    if (options[mode] === true) {
      return modes[mode];
    }
  }

  return {
    eyes: options.e || "oo",
    tongue: options.T || "  ",
  };
}

export { modes };
