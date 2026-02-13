# Fork workflow guide

This guide explains the fork-clone-branch-PR workflow used in open source development.

---

## What is forking?

A **fork** is your personal copy of someone else's repository. When you fork a project:

- You get a complete copy on your GitHub account
- You can make any changes without affecting the original
- You can propose changes back via pull request

```text
Original repo (upstream)     Your fork (origin)
github.com/cynthiateeters/   github.com/YOUR-USERNAME/
        cattlelog      →           cattlelog
           ↑                           ↓
           └──── Pull Request ─────────┘
```

---

## Step 1: Fork on GitHub

1. Go to the original repository
2. Click the **Fork** button (top right)
3. Select your account as the destination
4. Wait for GitHub to create your copy

After forking, you'll have:

- **Upstream:** `github.com/cynthiateeters/cattlelog` (original)
- **Origin:** `github.com/YOUR-USERNAME/cattlelog` (your fork)

---

## Step 2: Clone your fork

Clone YOUR fork, not the original:

```bash
# Replace YOUR-USERNAME with your GitHub username
git clone https://github.com/YOUR-USERNAME/cattlelog.git
cd cattlelog
```

Verify your remotes:

```bash
git remote -v
# origin    https://github.com/YOUR-USERNAME/cattlelog.git (fetch)
# origin    https://github.com/YOUR-USERNAME/cattlelog.git (push)
```

---

## Step 3: Create a branch

Never work directly on `main`. Create a feature branch using your GitHub username:

```bash
git checkout -b add-cow-USERNAME
```

Replace `USERNAME` with your actual GitHub username. For example, if your username is `jsmith`:

```bash
git checkout -b add-cow-jsmith
```

Other branch naming conventions:

- `fix-typo-readme` — Fixing something
- `update-docs` — Documentation changes

---

## Step 4: Make your changes

1. Create your creature file in `src/cows/`
2. Run `npm run build:index` to update the index
3. Test with `npm run dev` and `npm run see-cow src/cows/YOUR-ID.json`

---

## Step 5: Commit your changes

Stage and commit with a descriptive message:

```bash
git add src/cows/YOUR-ID.json src/cows/index.js
git commit -m "Add [creature name] creature"
```

Tips for commit messages:

- Start with a verb: "Add", "Fix", "Update"
- Keep it short (under 50 characters)
- Describe what, not how

---

## Step 6: Push to your fork

Push your branch to your fork (origin):

```bash
git push -u origin add-cow-USERNAME
```

The `-u` flag sets up tracking so future pushes are simpler.

---

## Step 7: Create a pull request

1. Go to your fork on GitHub
2. You'll see a banner: "Compare & pull request" — click it
3. Verify the base repository is the original (not your fork)
4. Write a clear title and description
5. Click **Create pull request**

### Good PR description

```markdown
## What I added

A friendly penguin creature named "Waddles"

## Why

Penguins are cool and I wanted one in the gallery

## Testing

- Ran `npm run see-cow src/cows/YOUR-ID.json` successfully
- Creature appears in gallery
- JSON validates without errors
```

---

## Common issues

### "Push rejected"

You're probably trying to push to the original repo instead of your fork:

```bash
# Check your remotes
git remote -v

# Should show YOUR fork as origin
# If not, fix it:
git remote set-url origin https://github.com/YOUR-USERNAME/cattlelog.git
```

### "Your branch is behind"

The original repo has new changes. You need to sync:

```bash
# Add upstream if not already added
git remote add upstream https://github.com/cynthiateeters/cattlelog.git

# Fetch and merge
git fetch upstream
git merge upstream/main
```

### "Merge conflicts"

This happens when your changes overlap with someone else's. Ask for help if you're stuck.

---

## Vocabulary

| Term             | Meaning                          |
| ---------------- | -------------------------------- |
| **Fork**         | Your copy of a repo on GitHub    |
| **Clone**        | Local copy on your computer      |
| **Origin**       | Your fork (where you push)       |
| **Upstream**     | The original repo (where you PR) |
| **Branch**       | Isolated line of development     |
| **Commit**       | Saved snapshot of changes        |
| **Push**         | Upload commits to GitHub         |
| **Pull Request** | Proposal to merge your changes   |

---

## The big picture

```text
1. FORK      Create your copy on GitHub
      ↓
2. CLONE     Download to your computer
      ↓
3. BRANCH    Create isolated workspace
      ↓
4. CHANGE    Make your edits
      ↓
5. COMMIT    Save your work
      ↓
6. PUSH      Upload to your fork
      ↓
7. PR        Propose changes to original
```

This workflow keeps everyone's work separate until it's reviewed and approved.
