#!/usr/bin/env node
/**
 * Fix over-escaped backslashes in cow JSON files.
 * Converts \\\\ to \\ in the art field.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cowsDir = join(__dirname, "..", "src", "cows");

const jsonFiles = readdirSync(cowsDir).filter((f) => f.endsWith(".json"));

let fixedCount = 0;

for (const file of jsonFiles) {
  const filePath = join(cowsDir, file);
  const content = readFileSync(filePath, "utf8");

  // Fix over-escaped backslashes: \\\\ -> \\
  // This handles cases where backslashes were double-escaped
  const fixed = content.replace(/\\\\\\\\/g, "\\\\");

  if (fixed !== content) {
    writeFileSync(filePath, fixed);
    console.log(`Fixed: ${file}`);
    fixedCount++;
  }
}

console.log(`\nFixed ${fixedCount} of ${jsonFiles.length} files`);
