#!/usr/bin/env node
/**
 * @fileoverview Generate src/cows/index.js from all JSON cow files.
 *
 * ## Teaching concepts demonstrated
 *
 * - **fs module**: Reading directories and writing files
 * - **path module**: Cross-platform path manipulation
 * - **Template literals**: Building code strings
 * - **Code generation**: Scripts that write code
 *
 * ## What this script does
 *
 * 1. Reads all .json files from src/cows/
 * 2. Generates import statements for each file
 * 3. Creates an exported array with ID injection
 * 4. Writes the generated code to src/cows/index.js
 *
 * @module build-cow-index
 * @author Cynthia Teeters
 * @license MIT
 *
 * @example
 * node scripts/build-cow-index.js
 */

import { readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// =============================================================================
// PATH SETUP
// =============================================================================

/**
 * __dirname equivalent for ESM.
 * In CommonJS, __dirname is a global. In ESM, we derive it from import.meta.url.
 */
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Path to the cows directory containing JSON files.
 * @type {string}
 */
const cowsDir = join(__dirname, "..", "src", "cows");

/**
 * Path to the output index file.
 * @type {string}
 */
const outputPath = join(cowsDir, "index.js");

// =============================================================================
// READ JSON FILES
// =============================================================================

/**
 * Get all JSON filenames from the cows directory.
 * @type {string[]}
 */
const jsonFiles = readdirSync(cowsDir)
  .filter((file) => file.endsWith(".json"))
  .sort();

console.log(`Found ${jsonFiles.length} cow JSON files`);

// =============================================================================
// GENERATE CODE
// =============================================================================

/**
 * Generate import statements.
 * Prefix with 'c_' since hex IDs may start with numbers (invalid JS identifiers).
 * Node 22+ requires import attributes for JSON files.
 * Example: import c_a3f8c1 from "./a3f8c1.json" with { type: "json" };
 */
const imports = jsonFiles
  .map((file) => {
    const id = file.replace(".json", "");
    return `import c_${id} from "./${file}" with { type: "json" };`;
  })
  .join("\n");

/**
 * Generate array entries with ID injection.
 * Example: { id: "a3f8c1", ...c_a3f8c1 },
 */
const entries = jsonFiles
  .map((file) => {
    const id = file.replace(".json", "");
    return `  { id: "${id}", ...c_${id} },`;
  })
  .join("\n");

/**
 * Complete generated file content.
 */
const output = `// AUTO-GENERATED - do not edit manually
// Run: node scripts/build-cow-index.js
// Generated: ${new Date().toISOString()}

${imports}

/**
 * Complete array of all cattlelog creatures.
 * Each cow object has its \`id\` injected from the filename.
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
${entries}
];
`;

// =============================================================================
// WRITE OUTPUT
// =============================================================================

writeFileSync(outputPath, output);
console.log(`Generated ${outputPath}`);
console.log(`Exported ${jsonFiles.length} cows`);
