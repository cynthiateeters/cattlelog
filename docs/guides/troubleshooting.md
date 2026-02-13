# Troubleshooting guide

When something goes wrong, follow this systematic approach to find and fix the problem.

---

## Quick diagnosis

Run these commands to understand your current state:

```bash
# Check if Node.js is installed correctly
node --version    # Should show v22.x.x or higher

# Check if you're in the right directory
pwd               # Should end with /cattlelog

# Check git status
git status        # Shows changed files and current branch

# Check if dependencies are installed
ls node_modules   # Should show many folders
```

---

## Setup problems

### "node: command not found"

Node.js isn't installed or isn't in your PATH.

**Fix:**

1. Download Node.js from [nodejs.org](https://nodejs.org/) (version 22 LTS)
2. Run the installer
3. Close and reopen your terminal
4. Try `node --version` again

### "npm install" fails

**Common causes:**

| Error message                       | Fix                                                           |
| ----------------------------------- | ------------------------------------------------------------- |
| `EACCES: permission denied`         | Don't use `sudo`. Fix npm permissions or use nvm              |
| `ENOENT: no such file or directory` | You're in the wrong folder. `cd cattlelog` first              |
| `npm ERR! code ERESOLVE`            | Delete `node_modules` and `package-lock.json`, then try again |

**Nuclear option:** If nothing works:

```bash
rm -rf node_modules package-lock.json
npm install
```

### "npm run dev" doesn't start

**Check:**

1. Did `npm install` complete without errors?
2. Are you in the cattlelog directory?
3. Is port 5173 already in use? Try `npm run dev -- --port 3000`

---

## Creature doesn't appear in gallery

Follow this flowchart:

```text
Creature not showing?
        │
        ▼
Did you run `npm run build:index`? ──No──► Run it now
        │
       Yes
        ▼
Did you refresh the browser? ──No──► Refresh (Ctrl+R or Cmd+R)
        │
       Yes
        ▼
Is your JSON file in src/cows/? ──No──► Move it there
        │
       Yes
        ▼
Does the filename end in .json? ──No──► Rename it
        │
       Yes
        ▼
Open VS Code Problems panel (View → Problems)
Does your file have red squiggles?
        │
       Yes
        ▼
Fix the validation errors (see below)
```

### Check the index was rebuilt

After running `npm run build:index`, look for your ID in the output:

```bash
npm run build:index
# Look for your ID (e.g., "a3f8c1") in the list
```

If your ID isn't listed, your file might be in the wrong location or have syntax errors.

---

## JSON validation errors

VS Code shows red squiggles when your JSON is invalid. Here's how to read the errors:

### "Value is not accepted"

```text
Error: Value is not accepted. Valid values: "original", "student", "community"
```

**Meaning:** The `source` field has an invalid value.

**Fix:** Use one of the allowed values:

```json
"source": "student"
```

### "Missing property"

```text
Error: Missing property "tags"
```

**Meaning:** A required field is missing.

**Fix:** Add the missing field:

```json
"tags": ["animal", "fantasy"]
```

### "Incorrect type"

```text
Error: Incorrect type. Expected "array"
```

**Meaning:** You used the wrong type (probably a string instead of array).

**Wrong:**

```json
"tags": "animal"
```

**Right:**

```json
"tags": ["animal"]
```

### "String does not match pattern"

```text
Error: String does not match the pattern of "^\d{4}-\d{2}-\d{2}$"
```

**Meaning:** The date format is wrong.

**Wrong:**

```json
"dateAdded": "February 12, 2026"
```

**Right:**

```json
"dateAdded": "2026-02-12"
```

---

## ASCII art looks wrong

### Art is jumbled or misaligned

**Cause:** Usually a backslash escaping problem.

**Check with see-cow:**

```bash
npm run see-cow src/cows/YOUR-ID.json
```

If the terminal output looks wrong, your JSON escaping is incorrect.

**Common fixes:**

| What you want        | What to write in JSON |
| -------------------- | --------------------- |
| Single backslash `\` | `\\`                  |
| Two backslashes `\\` | `\\\\`                |

**Example:**

```json
"art": "  /\\_/\\\n ( o.o )"
```

This renders as:

```text
  /\_/\
 ( o.o )
```

### $thoughts not connecting

The `$thoughts` placeholder should form a diagonal line pointing to your creature.

**Good pattern:**

```text
        $thoughts
         $thoughts
          $thoughts
           YOUR CREATURE HERE
```

**Bad pattern (straight down):**

```text
$thoughts
$thoughts
$thoughts
YOUR CREATURE HERE
```

### Art is too wide

If your art is wider than 40 characters, it may display poorly.

**Check width:**

1. Open your JSON file
2. Look at the longest line in your `art` field
3. Count characters (excluding `\n`)

**Fix:** Simplify or compress your art horizontally.

---

## Git problems

### "Push rejected"

**Cause:** You're trying to push to the original repo instead of your fork.

**Check your remotes:**

```bash
git remote -v
```

**Should show:**

```text
origin    https://github.com/YOUR-USERNAME/cattlelog.git (fetch)
origin    https://github.com/YOUR-USERNAME/cattlelog.git (push)
```

**If it shows `cynthiateeters` instead of your username:**

```bash
git remote set-url origin https://github.com/YOUR-USERNAME/cattlelog.git
```

### "Not on a branch"

**Cause:** You're in a detached HEAD state.

**Fix:**

```bash
git checkout main
git checkout -b add-cow-USERNAME
```

### "Changes not staged for commit"

**Cause:** You edited files but didn't `git add` them.

**Fix:**

```bash
git add src/cows/YOUR-ID.json src/cows/index.js
git status  # Should now show "Changes to be committed"
```

### PR shows wrong files

**Cause:** You modified files you shouldn't have.

**Check what changed:**

```bash
git diff --name-only main
```

**Should only show:**

- `src/cows/YOUR-ID.json`
- `src/cows/index.js`

If you see other files, you need to undo those changes:

```bash
git checkout main -- path/to/file/you/shouldnt/have/changed
```

---

## Still stuck?

### Gather information first

Before asking for help, run these commands and save the output:

```bash
node --version
npm --version
git status
git remote -v
ls src/cows/*.json | head -5
```

### Describe the problem clearly

Good help request:

> "When I run `npm run build:index`, I get an error that says 'SyntaxError: Unexpected token'. My file is `src/cows/a3f8c1.json`. Here's the error output: [paste error]"

Less helpful:

> "It doesn't work"

### Ask for help

- Describe what you expected to happen
- Describe what actually happened
- Include error messages (copy/paste, don't screenshot)
- Share your creature file if relevant
