# GitHub community files

This tutorial explains the special files GitHub recognizes for open source projects.

> For background on _why_ these files matter, see [Intro to open source](intro-to-open-source.md).

## The .github folder

GitHub automatically detects files in the `.github/` folder and uses them to enhance your repository. These files create a better experience for contributors without requiring any code.

```text
.github/
├── PULL_REQUEST_TEMPLATE.md    # Auto-fills new PR descriptions
└── ISSUE_TEMPLATE/
    ├── bug_report.md           # Bug report form
    ├── creature_help.md        # Help request form
    └── config.yml              # Issue chooser settings
```

## Root-level community files

Some files live in the repository root (not in `.github/`):

| File               | Purpose                                       |
| ------------------ | --------------------------------------------- |
| README.md          | Project overview (displayed on repo homepage) |
| LICENSE            | Legal terms for using the code                |
| CONTRIBUTING.md    | How to contribute                             |
| CODE_OF_CONDUCT.md | Community behavior standards                  |

GitHub displays these in the "Community Standards" section of your repository insights.

## How each file works

### PULL_REQUEST_TEMPLATE.md

When someone creates a pull request, GitHub automatically fills the description field with this template's content.

**Location:** `.github/PULL_REQUEST_TEMPLATE.md`

**What it does:** Reminds contributors to complete a checklist before submitting. This reduces back-and-forth by ensuring PRs include necessary information.

### Issue templates

When someone clicks "New Issue," GitHub shows a chooser with your templates instead of a blank form.

**Location:** `.github/ISSUE_TEMPLATE/`

Each `.md` file becomes an option. The YAML frontmatter controls how it appears:

```yaml
---
name: Bug report # Button label
about: Report a problem with the gallery # Description shown
title: "[Bug] " # Pre-filled title
labels: bug # Auto-applied labels
assignees: "" # Auto-assigned users
---
```

### config.yml

Controls the issue template chooser behavior.

**Location:** `.github/ISSUE_TEMPLATE/config.yml`

```yaml
blank_issues_enabled: false # Disable "blank issue" option
contact_links: # Add helpful links
  - name: Assignment instructions
    url: https://example.com
    about: Step-by-step guide
```

Setting `blank_issues_enabled: false` forces users to pick a template, which ensures you get structured information.

### CONTRIBUTING.md

GitHub automatically links to this file:

- When viewing issues: "Please read the contributing guidelines"
- When creating PRs: Link appears in the sidebar

**Location:** Repository root

### CODE_OF_CONDUCT.md

GitHub displays this in repository insights under "Community Standards" and links to it from various places.

**Location:** Repository root

Most projects use the [Contributor Covenant](https://www.contributor-covenant.org/), the same code of conduct used by Node.js, Rails, and VS Code.

## For maintainers: testing your templates

If you're setting up templates for **your own repository**, here's how to verify they work.

### PR template

1. Create a branch with any small change
2. Open a pull request
3. Verify the template appears in the description

### Issue templates

1. Go to your repository's Issues tab
2. Click "New Issue"
3. Verify the template chooser appears with your options

## Learn more

- [GitHub docs: Issue templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates)
- [GitHub docs: Community standards](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions)
- [Contributor Covenant](https://www.contributor-covenant.org/)
