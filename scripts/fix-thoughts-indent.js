#!/usr/bin/env node

/**
 * @fileoverview Fix $thoughts indentation in creature JSON files.
 *
 * Many creatures have the first $thoughts at column 0 when it should
 * be indented to form a proper diagonal with subsequent lines.
 *
 * @example
 * npm run fix-thoughts
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const cowsDir = "src/cows";
let fixedCount = 0;
let skippedCount = 0;

const files = readdirSync(cowsDir).filter((f) => f.endsWith(".json"));

for (const file of files) {
  const filePath = join(cowsDir, file);
  const content = readFileSync(filePath, "utf8");
  const creature = JSON.parse(content);

  const lines = creature.art.split("\n");

  // Find lines containing $thoughts and their indentation
  const thoughtLines = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^(\s*)\$thoughts/);
    if (match) {
      thoughtLines.push({
        index: i,
        indent: match[1].length,
        line: lines[i],
      });
    }
  }

  // Skip if no $thoughts or only one
  if (thoughtLines.length < 2) {
    skippedCount++;
    continue;
  }

  // Check if first line needs fixing
  // Pattern: each successive $thoughts should have 1 more space
  // So if line 2 has indent N, line 1 should have indent N-1
  const first = thoughtLines[0];
  const second = thoughtLines[1];

  const expectedFirstIndent = second.indent - 1;

  if (first.indent >= expectedFirstIndent) {
    // Already correct or close enough
    skippedCount++;
    continue;
  }

  // Fix the first line by adding spaces
  const spacesToAdd = expectedFirstIndent - first.indent;
  const spaces = " ".repeat(spacesToAdd);
  lines[first.index] = spaces + lines[first.index];

  // Update the art
  creature.art = lines.join("\n");

  // Write back
  const newContent = JSON.stringify(creature, null, 2) + "\n";
  writeFileSync(filePath, newContent);

  console.log(`Fixed: ${file} (added ${spacesToAdd} spaces)`);
  fixedCount++;
}

console.log();
console.log(`Fixed: ${fixedCount} files`);
console.log(`Skipped: ${skippedCount} files (already correct or single $thoughts)`);
