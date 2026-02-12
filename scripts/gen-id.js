#!/usr/bin/env node
/**
 * @fileoverview Generate unique 6-character hex IDs for cattlelog creatures.
 *
 * ## Teaching concepts demonstrated
 *
 * - **Shebang line**: `#!/usr/bin/env node` makes this file executable
 * - **process.argv**: Accessing command-line arguments
 * - **crypto.randomUUID()**: Secure random number generation (Web Crypto API)
 * - **String methods**: .replace() with regex, .slice()
 *
 * ## How crypto.randomUUID() works
 *
 * The Web Crypto API provides cryptographically secure random values.
 * `crypto.randomUUID()` generates a Version 4 UUID like:
 *   "550e8400-e29b-41d4-a716-446655440000"
 *
 * We strip hyphens and take the first 6 characters for our short IDs.
 *
 * @module gen-id
 * @author Cynthia Teeters
 * @license MIT
 *
 * @example
 * Generate one ID:
 * node scripts/gen-id.js
 * Output: a3f8c1
 *
 * @example
 * Generate 5 IDs:
 * node scripts/gen-id.js 5
 * Output:
 * a3f8c1
 * b7e2d4
 * c9a1f6
 * d2b5e8
 * e4c7a2
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

/**
 * Number of IDs to generate.
 * Reads from command line argument, defaults to 1.
 * @type {number}
 */
const count = parseInt(process.argv[2]) || 1;

// =============================================================================
// MAIN EXECUTION
// =============================================================================

for (let i = 0; i < count; i++) {
  // crypto.randomUUID() returns: "550e8400-e29b-41d4-a716-446655440000"
  // We strip hyphens and take first 6 chars: "550e84"
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 6);
  console.log(id);
}
