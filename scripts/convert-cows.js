#!/usr/bin/env node
/**
 * @fileoverview One-time migration script to convert .cow files to JSON format.
 *
 * This script is NOT part of the final cattlelog repo - it's used once during
 * the transformation process and can be deleted afterward.
 *
 * @module convert-cows
 * @author Cynthia Teeters
 * @license MIT
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// =============================================================================
// PATH SETUP
// =============================================================================

const __dirname = dirname(fileURLToPath(import.meta.url));
const cowsDir = join(__dirname, "..", "cows");
const outputDir = join(__dirname, "..", "src", "cows");

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// =============================================================================
// PARSING FUNCTIONS
// =============================================================================

/**
 * Parse Perl heredoc format to extract ASCII art.
 *
 * Handles variations:
 * - $the_cow = <<"EOC";
 * - $the_cow = <<EOC;
 * - $the_cow = <<'EOC';
 *
 * @param {string} content - Raw .cow file content
 * @returns {string} Extracted ASCII art
 */
function parseCowFile(content) {
  // Match content between heredoc markers
  // The marker can be EOC, EOF, or other identifiers
  const match = content.match(
    /\$the_cow\s*=\s*<<["']?(\w+)["']?;?\s*([\s\S]*?)\1/
  );

  if (!match) {
    console.warn("  Warning: Could not parse heredoc format");
    return null;
  }

  return match[2].trimEnd();
}

/**
 * Convert filename to display name.
 * Example: "three-eyes" -> "Three eyes"
 *
 * @param {string} filename - Filename without extension
 * @returns {string} Display name
 */
function toDisplayName(filename) {
  const name = filename.replace(/-/g, " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Generate 6-char hex ID.
 * @returns {string} Unique ID
 */
function genId() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 6);
}

// =============================================================================
// MAIN CONVERSION
// =============================================================================

// Get all .cow files
const cowFiles = readdirSync(cowsDir).filter((f) => f.endsWith(".cow"));
console.log(`Found ${cowFiles.length} .cow files\n`);

// Track results
const results = {
  success: [],
  failed: [],
};

// Process each file
for (const file of cowFiles) {
  const basename = file.replace(".cow", "");
  process.stdout.write(`Converting ${file}...`);

  try {
    const content = readFileSync(join(cowsDir, file), "utf-8");
    const art = parseCowFile(content);

    if (!art) {
      results.failed.push({ file, reason: "Could not parse" });
      console.log(" FAILED (parse error)");
      continue;
    }

    const id = genId();
    const json = {
      name: toDisplayName(basename),
      author: "Tony Monroe",
      source: "original",
      tags: [],
      dateAdded: "2026-02-12",
      art: art,
    };

    const outputPath = join(outputDir, `${id}.json`);
    writeFileSync(outputPath, JSON.stringify(json, null, 2) + "\n");

    results.success.push({ file, id, name: json.name });
    console.log(` -> ${id}.json`);
  } catch (err) {
    results.failed.push({ file, reason: err.message });
    console.log(` FAILED (${err.message})`);
  }
}

// =============================================================================
// SUMMARY
// =============================================================================

console.log("\n" + "=".repeat(60));
console.log(`Conversion complete!`);
console.log(`  Success: ${results.success.length}`);
console.log(`  Failed:  ${results.failed.length}`);

if (results.failed.length > 0) {
  console.log("\nFailed files:");
  for (const { file, reason } of results.failed) {
    console.log(`  - ${file}: ${reason}`);
  }
}

console.log("\nNext steps:");
console.log("  1. Review src/cows/*.json for inappropriate content");
console.log("  2. Run: node scripts/build-cow-index.js");
console.log("  3. Delete cows/ directory when satisfied");
