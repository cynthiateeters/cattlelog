# Code generation walkthrough

This walkthrough explains how `scripts/build-cow-index.js` works. If you're curious about "how does the gallery know which creatures exist?" — this is the answer.

The script demonstrates several important concepts:

- Reading directories with Node.js
- Transforming arrays with `.map()` and `.filter()`
- Template literals for building strings
- **Code that writes code** (also called metaprogramming)

---

## What the script does

When you run `npm run build:index`, the script:

1. Reads all `.json` files from `src/cows/`
2. Generates JavaScript import statements for each file
3. Creates an exported array containing all creatures
4. Writes this generated code to `src/cows/index.js`

The gallery then imports from `index.js` to get every creature at once.

---

## The script, section by section

### The shebang

```javascript
#!/usr/bin/env node
```

This line tells your computer "run this file with Node.js." It's what lets you run the script directly with `node scripts/build-cow-index.js`.

### Imports

```javascript
import { readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
```

These are Node.js built-in modules:

| Module      | Purpose                                  |
| ----------- | ---------------------------------------- |
| `node:fs`   | File system operations (read/write)      |
| `node:path` | Cross-platform path manipulation         |
| `node:url`  | URL parsing (needed for ESM \_\_dirname) |

The `node:` prefix is modern Node.js syntax that explicitly imports built-in modules.

### The \_\_dirname pattern

```javascript
const __dirname = dirname(fileURLToPath(import.meta.url));
```

This is one of the trickier parts. Let's break it down:

1. `import.meta.url` gives you the file's location as a URL like `file:///path/to/script.js`
2. `fileURLToPath()` converts that URL to a normal path like `/path/to/script.js`
3. `dirname()` removes the filename, leaving just `/path/to/`

**Why do we need this?** In older CommonJS modules, `__dirname` was a built-in global. In modern ESM modules, it doesn't exist — we have to create it ourselves.

### Setting up paths

```javascript
const cowsDir = join(__dirname, "..", "src", "cows");
const outputPath = join(cowsDir, "index.js");
```

`join()` combines path segments with the correct separator for your operating system (`/` on Mac/Linux, `\` on Windows).

The `".."` means "go up one directory" — from `scripts/` up to the project root, then into `src/cows/`.

### Reading the directory

```javascript
const jsonFiles = readdirSync(cowsDir)
  .filter((file) => file.endsWith(".json"))
  .sort();
```

This is a **method chain** — three operations in sequence:

1. `readdirSync(cowsDir)` returns an array of all filenames: `["a3f8c1.json", "index.js", "b2d4e6.json", ...]`
2. `.filter()` keeps only files ending with `.json`
3. `.sort()` puts them in alphabetical order

The `Sync` in `readdirSync` means "wait for this to complete before continuing." (The async version, `readdir`, would use callbacks or promises.)

### Generating import statements

```javascript
const imports = jsonFiles
  .map((file) => {
    const id = file.replace(".json", "");
    return `import c_${id} from "./${file}" with { type: "json" };`;
  })
  .join("\n");
```

For each filename like `a3f8c1.json`, this generates a line like:

```javascript
import c_a3f8c1 from "./a3f8c1.json" with { type: "json" };
```

**Why `c_` prefix?** JavaScript variable names can't start with numbers. Since hex IDs might start with `0-9` (like `9ab123`), we add `c_` to make it valid.

**What's `with { type: "json" }`?** This is an [import attribute](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_attributes) that tells Node.js "this is a JSON file, parse it as data." Node 22+ requires this for JSON imports.

The `.join("\n")` at the end turns the array into a single string with newlines between each import.

### Generating array entries

```javascript
const entries = jsonFiles
  .map((file) => {
    const id = file.replace(".json", "");
    return `  { id: "${id}", ...c_${id} },`;
  })
  .join("\n");
```

For each file, this generates an array entry like:

```javascript
  { id: "a3f8c1", ...c_a3f8c1 },
```

The `...c_a3f8c1` is the **spread operator** — it copies all properties from the imported JSON object. The `id` property is added first, so each creature knows its own ID even though it's not stored in the JSON file.

### Building the complete output

```javascript
const output = `// AUTO-GENERATED - do not edit manually
// Run: node scripts/build-cow-index.js
// Generated: ${new Date().toISOString()}

${imports}

/**
 * Complete array of all cattlelog creatures.
 * ...
 */
export const cows = [
${entries}
];
`;
```

This is a **template literal** (the backticks). It lets us:

- Write multi-line strings
- Insert variables with `${...}`
- Combine our generated imports and entries

The comment at the top warns humans not to edit this file manually — their changes would be overwritten the next time someone runs the script.

### Writing the file

```javascript
writeFileSync(outputPath, output);
console.log(`Generated ${outputPath}`);
```

`writeFileSync()` creates (or overwrites) the file with our generated content. If you open `src/cows/index.js`, you'll see the output this script creates.

---

## The big picture

This script is an example of **code generation** — code that writes code. It's a powerful pattern used in many real projects:

- Build tools generate bundled JavaScript
- ORMs generate database queries
- API clients generate type definitions

The key insight: instead of manually maintaining a list of 100+ creatures, we let the script do it automatically. Add a new JSON file, run the script, done.

---

## Try it yourself

1. Look at the current `src/cows/index.js` — see the generated imports?
2. Add a comment somewhere in that file
3. Run `npm run build:index`
4. Check `src/cows/index.js` again — your comment is gone!

This demonstrates why the "AUTO-GENERATED" warning matters.

---

## Related concepts

If you found this interesting, explore:

- [Node.js fs module](https://nodejs.org/api/fs.html) - file system operations
- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) - transforming arrays
- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) - string interpolation
- [ESM vs CommonJS](https://nodejs.org/api/esm.html) - module systems explained
