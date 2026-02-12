// AUTO-GENERATED - do not edit manually
// Run: node scripts/build-cow-index.js
// Generated: 2026-02-12T18:10:31.079Z

import abc123 from "./abc123.json";

/**
 * Complete array of all cattlelog creatures.
 * Each cow object has its `id` injected from the filename.
 *
 * @typedef {Object} Cow
 * @property {string} id - Unique 6-char hex identifier (from filename)
 * @property {string} name - Display name
 * @property {string} author - Creator name
 * @property {string} source - "original" | "student" | "community"
 * @property {string[]} tags - Categories for filtering
 * @property {string} dateAdded - ISO date string
 * @property {string} art - ASCII art with $thoughts, $eyes, $tongue placeholders
 *
 * @type {Cow[]}
 */
export const cows = [
  { id: "abc123", ...abc123 },
];
