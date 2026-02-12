#!/usr/bin/env node

/**
 * @fileoverview Preview a creature JSON file in the terminal.
 *
 * Renders the ASCII art with placeholders replaced so you can
 * visually inspect before adding to src/cows/.
 *
 * @example
 * npm run see-cow docs/json-playground/test-dragon.json
 */

import { readFileSync } from "node:fs";
import { replacePlaceholders } from "../src/lib/replacer.js";

const filePath = process.argv[2];

if (!filePath) {
  console.error("Usage: npm run see-cow <path-to-json>");
  console.error("Example: npm run see-cow docs/json-playground/test-dragon.json");
  process.exit(1);
}

try {
  const json = readFileSync(filePath, "utf8");
  const creature = JSON.parse(json);

  const rendered = replacePlaceholders(creature.art, {
    thoughts: "\\",
    eyes: "oo",
    tongue: "  ",
  });

  console.log();
  console.log(`  Name: ${creature.name}`);
  console.log(`  Author: ${creature.author}`);
  console.log(`  Tags: ${creature.tags.join(", ")}`);
  console.log();
  console.log(rendered);
  console.log();
} catch (error) {
  if (error.code === "ENOENT") {
    console.error(`File not found: ${filePath}`);
  } else if (error instanceof SyntaxError) {
    console.error(`Invalid JSON: ${error.message}`);
  } else {
    console.error(`Error: ${error.message}`);
  }
  process.exit(1);
}
