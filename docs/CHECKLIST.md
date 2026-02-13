# Assignment checklist

Use this checklist to verify your work before submitting. Every item should be checked.

---

## Fork and clone

- [ ] Forked the Cattlelog repository to your GitHub account
- [ ] Cloned YOUR fork (not the original)
- [ ] `npm install` runs without errors
- [ ] `npm run dev` starts the development server
- [ ] Gallery displays in browser with 189+ creatures

## Your creature

- [ ] Generated a unique ID with `npm run gen-id`
- [ ] Created `src/cows/YOUR-ID.json` with your creature
- [ ] JSON file passes validation (no red squiggles in VS Code)
- [ ] All required fields are present:
  - [ ] `name` — your creature's name
  - [ ] `author` — your name
  - [ ] `source` — set to `"student"`
  - [ ] `tags` — at least one tag
  - [ ] `dateAdded` — today's date (YYYY-MM-DD)
  - [ ] `art` — your ASCII art

## Preview your creature

- [ ] Run `npm run see-cow src/cows/YOUR-ID.json`
- [ ] Art looks correct (not jumbled or abstract)
- [ ] `$thoughts` forms a diagonal line pointing to your creature
- [ ] `$eyes` appears where eyes should be (if applicable)

## Build and verify

- [ ] `npm run build:index` runs without errors
- [ ] Your creature appears in the gallery
- [ ] Your creature displays correctly (no broken formatting)

## Git workflow

- [ ] Created a feature branch named `add-cow-USERNAME` (your GitHub username)
- [ ] Committed your changes with a descriptive message
- [ ] Pushed your branch to your fork

## Pull request

- [ ] Created a pull request from your fork to the original repo
- [ ] PR title describes your creature
- [ ] PR description explains what you added
- [ ] PR shows only your creature file and the updated index.js

---

## Quick verification

Run these commands to verify your setup:

```bash
# Should start dev server
npm run dev

# Should output your creature's ID in the list
npm run build:index

# Should show your changes
git status

# Should show your creature file
git diff --name-only
```

---

## Files you should have changed

Your pull request should include exactly these changes:

```text
src/cows/
├── YOUR-ID.json       (new file - your creature)
└── index.js           (modified - auto-generated)
```

**Do not modify other files.** If you see other changes, ask for help.

---

## Common issues

| Problem                 | Solution                                       |
| ----------------------- | ---------------------------------------------- |
| Art looks broken        | Run `npm run see-cow src/cows/YOUR-ID.json`    |
| Creature doesn't appear | Run `npm run build:index` and refresh          |
| Red squiggles in JSON   | Check field names and types against schema     |
| Push rejected           | Make sure you're pushing to YOUR fork          |
| PR shows wrong files    | You may have modified files you shouldn't have |
