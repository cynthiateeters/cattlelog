# npm scripts reference

This project includes several scripts to help you create and test creatures. All scripts are run from the terminal with `npm run <script-name>`.

---

## Scripts you'll use

### npm run dev

Starts a local development server so you can view the gallery in your browser.

```bash
npm run dev
```

**What happens:**

- Vite starts a server at `http://localhost:5173`
- The gallery opens in your browser
- Changes to files automatically refresh the page

**When to use:** After cloning the repo, and whenever you want to see the gallery.

**Example output:**

```text
  VITE v5.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

### npm run gen-id

Generates a unique 6-character hexadecimal ID for your creature file.

```bash
npm run gen-id
```

**What happens:**

- Creates a random ID like `a3f8c1`
- Checks that no existing creature uses this ID
- Outputs the ID to your terminal

**When to use:** Once, at the start — before creating your creature file.

**Example output:**

```text
Generated unique creature ID: a3f8c1
Use this as your filename: src/cows/a3f8c1.json
```

---

### npm run see-cow

Previews a creature file in the terminal with a speech bubble, exactly as it will appear in the gallery.

```bash
npm run see-cow src/cows/YOUR-ID.json
```

**What happens:**

- Reads the JSON file you specify
- Renders the ASCII art with a speech bubble
- Shows placeholders replaced (`$thoughts`, `$eyes`, `$tongue`)

**When to use:** After creating or editing your creature file, to verify it looks correct.

**Requirements:** The JSON file must be complete and valid — all required fields (`name`, `author`, `source`, `tags`, `dateAdded`, `art`) must be present.

**Example output:**

```text
 _______________
< Hello, world! >
 ---------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

**Common issues:**

| Problem              | Cause              | Fix                                             |
| -------------------- | ------------------ | ----------------------------------------------- |
| "Cannot find module" | File path is wrong | Check the path exists                           |
| "Unexpected token"   | Invalid JSON       | Fix syntax errors (VS Code shows red squiggles) |
| Art looks garbled    | Escaping issues    | Check backslashes — use `\\` for `\`            |

---

### npm run build:index

Rebuilds `src/cows/index.js` to include all creature files. The gallery reads this index to know which creatures exist.

```bash
npm run build:index
```

**What happens:**

- Scans `src/cows/` for all `.json` files
- Generates import statements for each creature
- Writes the updated `index.js`

**When to use:** After adding your creature file to `src/cows/`.

**Example output:**

```text
Found 190 creature files
Writing src/cows/index.js
Done! Gallery index updated.
```

**Important:** If you skip this step, your creature won't appear in the gallery even if the file exists.

---

## Typical workflow

Here's when you'll use each script:

```text
1. Clone the repo
2. npm install              ← Install dependencies
3. npm run dev              ← Start the gallery
4. npm run gen-id           ← Get your unique ID
5. Create src/cows/YOUR-ID.json
6. npm run see-cow src/cows/YOUR-ID.json  ← Preview your creature
7. npm run build:index      ← Add to gallery
8. Refresh browser          ← See it in the gallery
```

---

## Other scripts

These scripts exist but you probably won't need them:

| Script                 | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `npm run build`        | Build for production (not needed for this assignment)    |
| `npm test`             | Run tests (not needed for this assignment)               |
| `npm run fix-thoughts` | Utility to fix `$thoughts` indentation in existing files |

---

## Troubleshooting

### "npm: command not found"

Node.js isn't installed. Download from [nodejs.org](https://nodejs.org/).

### Scripts don't run

Make sure you ran `npm install` first. This installs the tools the scripts need.

### "Error: Cannot find module"

You're probably in the wrong directory. Run `pwd` to check — you should be in the `cattlelog` folder.
