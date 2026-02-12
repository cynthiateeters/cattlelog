# Week 4: Cattlelog contribution

> **This is your first open source contribution.**
>
> You'll fork a real project, add your own ASCII creature, and submit a pull request. This is the same workflow used by developers contributing to projects worldwide.
>
> **Make it yours.** Create a creature that represents you — an animal, object, character, or something completely original. There's no wrong answer.

---

## What you're building

An ASCII art creature that will be added to the Cattlelog gallery. You'll practice the fork-clone-branch-PR workflow that's standard for open source contributions.

## Before you begin

- [ ] GitHub account
- [ ] VS Code with GitHub Copilot extension
- [ ] Node.js installed (version 22 or higher)
- [ ] Completed Week 3

## If you get stuck

| What you need        | Command                     |
| -------------------- | --------------------------- |
| Open terminal        | View → Terminal (or Ctrl+`) |
| Install packages     | `npm install`               |
| Start dev server     | `npm run dev`               |
| Generate creature ID | `npm run gen-id`            |
| Rebuild index        | `npm run build:index`       |

**Ask Agent for help.** Describe your problem — this is part of learning to work with AI.

---

## Part 1: Fork and clone

1. Go to the Cattlelog repository on GitHub
2. Click **Fork** (top right) to create your copy
3. Clone YOUR fork (not the original):
   ```bash
   git clone https://github.com/YOUR-USERNAME/cattlelog.git
   cd cattlelog
   ```
4. Install dependencies: `npm install`
5. Start the dev server: `npm run dev`
6. Open the localhost URL to see the gallery

**Verify:** You should see 189 creatures in the gallery.

---

## Part 2: Create your creature

### Step 1: Generate your ID

```bash
npm run gen-id
```

This outputs a unique 6-character ID like `a3f8c1`. Copy it — you'll need it for your filename.

### Step 2: Create the JSON file

Create a new file in `src/cows/` named with your ID:

```text
src/cows/a3f8c1.json
```

### Step 3: Add your creature data

```json
{
  "name": "Your Creature Name",
  "author": "Your Name",
  "source": "student",
  "tags": ["animal", "fantasy"],
  "dateAdded": "2026-02-12",
  "art": "Your ASCII art here"
}
```

**Tips for ASCII art:**

- Use `$thoughts` where the speech bubble connector should go
- Use `$eyes` for eyes (will be replaced with `oo` by default)
- Use `$tongue` for tongue (optional)
- Keep it under 40 characters wide for best display

See [json-schema-validation.md](json-schema-validation.md) for field details and validation help.

### Step 4: Rebuild and verify

```bash
npm run build:index
```

Refresh your browser — your creature should appear in the gallery!

---

## Part 3: Commit and push

1. Create a branch for your work:

   ```bash
   git checkout -b add-creature-YOURID
   ```

2. Stage your files:

   ```bash
   git add src/cows/YOUR-ID.json src/cows/index.js
   ```

3. Commit with a descriptive message:

   ```bash
   git commit -m "Add [creature name] creature"
   ```

4. Push to your fork:
   ```bash
   git push -u origin add-creature-YOURID
   ```

---

## Part 4: Create pull request

1. Go to your fork on GitHub
2. You'll see a banner: "Compare & pull request" — click it
3. Write a title: "Add [creature name] creature"
4. In the description, include:
   - What your creature is
   - Why you chose it
5. Click **Create pull request**

**Verify:** Your PR appears in the original repository's Pull Requests tab.

---

## Part 5: Document and reflect

1. **Take a screenshot** of your creature in the gallery
2. **Complete your reflection** about the fork workflow experience

---

## Checklist

Before submitting, verify your work with [CHECKLIST.md](CHECKLIST.md).

## Resources

- [json-schema-validation.md](json-schema-validation.md) — Creature file format and VS Code validation
- [json-playground/](json-playground/) — Practice files for experimenting

---

## Remember

> Your first open source contribution is a milestone. You're now part of a global community of developers who build software together.

Take your time. Ask questions. You've got this!
