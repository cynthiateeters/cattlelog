/**
 * Cattlelog - ASCII art creatures for the browser
 *
 * @module cattlelog
 */

import { cows } from "../cows/index.js";
import { getFace, modes } from "./faces.js";
import { replacePlaceholders } from "./replacer.js";
import { say, think } from "./balloon.js";

/**
 * Render a creature with a message.
 *
 * @param {string} text - Message to display
 * @param {Object} [options] - Rendering options
 * @param {string} [options.cow] - Cow name or ID (default: "Default")
 * @param {boolean} [options.think] - Use thought bubble instead of speech
 * @param {number} [options.wrap] - Wrap text at this width
 * @param {string} [options.e] - Custom eyes (2 chars)
 * @param {string} [options.T] - Custom tongue (2 chars)
 * @param {boolean} [options.b] - Borg mode
 * @param {boolean} [options.d] - Dead mode
 * @param {boolean} [options.g] - Greedy mode
 * @param {boolean} [options.p] - Paranoid mode
 * @param {boolean} [options.s] - Stoned mode
 * @param {boolean} [options.t] - Tired mode
 * @param {boolean} [options.w] - Wired mode
 * @param {boolean} [options.y] - Young mode
 * @returns {string} - Complete ASCII art with balloon and creature
 */
export function moo(text, options = {}) {
  const cowName = options.cow || "Default";
  const cow = getCow(cowName);

  if (!cow) {
    throw new Error(`Cow not found: ${cowName}`);
  }

  const face = getFace(options);
  const balloon = options.think ? think(text, options.wrap) : say(text, options.wrap);
  const thoughts = options.think ? "o" : "\\";

  const art = replacePlaceholders(cow.art, {
    thoughts,
    eyes: face.eyes,
    tongue: face.tongue,
  });

  return balloon + "\n" + art;
}

/**
 * Get a cow by name or ID.
 *
 * @param {string} nameOrId - Cow name or 6-char hex ID
 * @returns {Object|undefined} - Cow object or undefined
 */
export function getCow(nameOrId) {
  return cows.find(
    (cow) =>
      cow.id === nameOrId ||
      cow.name.toLowerCase() === nameOrId.toLowerCase()
  );
}

/**
 * Get all available cows.
 *
 * @returns {Object[]} - Array of all cow objects
 */
export function listCows() {
  return cows;
}

/**
 * Get cow names for display.
 *
 * @returns {string[]} - Array of cow names
 */
export function getCowNames() {
  return cows.map((cow) => cow.name);
}

export { cows, modes, getFace, replacePlaceholders, say, think };
