# Cattlelog project instructions

## Code style

### JSDoc comments

- Never use `//` inside JSDoc blocks - it causes VS Code strikethrough rendering
- Use plain `*` continuation lines for examples and notes

```javascript
// BAD - causes strikethrough in VS Code
/**
 * @example
 * // Generate one ID
 * node scripts/gen-id.js
 */

// GOOD - no strikethrough
/**
 * @example
 * Generate one ID:
 * node scripts/gen-id.js
 */
```

## Project structure

- `scripts/` - Build utilities (gen-id.js, build-cow-index.js)
- `src/cows/` - JSON creature files with 6-char hex IDs
- `src/lib/` - ESM library modules (balloon, faces, replacer)
- `src/gallery/` - Browser gallery code
- `test/` - Vitest tests with teaching comments
