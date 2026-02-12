#!/usr/bin/env node

/**
 * Cattlelog CLI - ASCII art creatures in your terminal
 *
 * Usage:
 *   cattlelog "Hello world"
 *   echo "Hello" | cattlelog
 *   cattlelog -l              # list creatures
 *   cattlelog -f dragon "Hi"  # use specific creature
 */

import { parseArgs } from "node:util";
import { moo, getCowNames, getCow } from "../src/lib/index.js";

const options = {
  help: { type: "boolean", short: "h" },
  list: { type: "boolean", short: "l" },
  cow: { type: "string", short: "f" },
  think: { type: "boolean", short: "t" },
  wrap: { type: "string", short: "W" },
  eyes: { type: "string", short: "e" },
  tongue: { type: "string", short: "T" },
  borg: { type: "boolean", short: "b" },
  dead: { type: "boolean", short: "d" },
  greedy: { type: "boolean", short: "g" },
  paranoid: { type: "boolean", short: "p" },
  stoned: { type: "boolean", short: "s" },
  tired: { type: "boolean" },
  wired: { type: "boolean", short: "w" },
  young: { type: "boolean", short: "y" },
};

const { values, positionals } = parseArgs({
  options,
  allowPositionals: true,
});

if (values.help) {
  console.log(`
cattlelog - ASCII art creatures in your terminal

Usage:
  cattlelog [options] [message]
  echo "message" | cattlelog [options]

Options:
  -h, --help     Show this help
  -l, --list     List all available creatures
  -f, --cow      Select creature by name or ID (default: "Default")
  -t, --think    Use thought bubble instead of speech
  -W, --wrap     Wrap text at specified width
  -e, --eyes     Custom eyes (2 characters)
  -T, --tongue   Custom tongue (2 characters)

Face modes:
  -b, --borg     Borg mode (==)
  -d, --dead     Dead mode (xx)
  -g, --greedy   Greedy mode ($$)
  -p, --paranoid Paranoid mode (@@)
  -s, --stoned   Stoned mode (**)
  --tired        Tired mode (--)
  -w, --wired    Wired mode (OO)
  -y, --young    Young mode (..)

Examples:
  cattlelog "Hello world"
  cattlelog -f dragon "Rawr!"
  cattlelog -d "Game over"
  echo "Piped input" | cattlelog
`);
  process.exit(0);
}

if (values.list) {
  const names = getCowNames();
  console.log("Available creatures:\n");
  names.forEach((name) => console.log(`  ${name}`));
  console.log(`\nTotal: ${names.length} creatures`);
  process.exit(0);
}

async function main() {
  let text = positionals.join(" ");

  // Read from stdin if no text provided and stdin is piped
  if (!text && !process.stdin.isTTY) {
    const chunks = [];
    for await (const chunk of process.stdin) {
      chunks.push(chunk);
    }
    text = Buffer.concat(chunks).toString().trim();
  }

  if (!text) {
    console.error("Error: No message provided");
    console.error("Usage: cattlelog [options] <message>");
    console.error("       echo 'message' | cattlelog");
    process.exit(1);
  }

  const mooOptions = {
    cow: values.cow,
    think: values.think,
    wrap: values.wrap ? parseInt(values.wrap, 10) : undefined,
    e: values.eyes,
    T: values.tongue,
    b: values.borg,
    d: values.dead,
    g: values.greedy,
    p: values.paranoid,
    s: values.stoned,
    t: values.tired,
    w: values.wired,
    y: values.young,
  };

  try {
    console.log(moo(text, mooOptions));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
