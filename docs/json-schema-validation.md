# JSON Schema validation in VS Code

This guide explains how cattlelog uses JSON Schema to help you create valid creature files.

## What is JSON Schema?

JSON Schema is a vocabulary for describing the structure of JSON data. Think of it as a blueprint that defines:

- What fields are required
- What types each field should be (string, number, array, etc.)
- What values are allowed (enums, patterns, min/max)

## How cattlelog uses it

This project includes two files that work together:

| File                    | Purpose                                                |
| ----------------------- | ------------------------------------------------------ |
| `creature.schema.json`  | Defines the structure of creature files                |
| `.vscode/settings.json` | Tells VS Code to apply the schema to `src/cows/*.json` |

When you open any JSON file in `src/cows/`, VS Code automatically:

- **Validates** your data against the schema
- **Shows red squiggles** on errors
- **Provides autocomplete** for field names and enum values
- **Displays documentation** when you hover over fields

No setup required - it just works when you clone the repo and open it in VS Code.

## Try it yourself

### See validation in action

1. Open any file in `src/cows/` (e.g., `src/cows/0b9d72.json`)
2. Change `"source": "original"` to `"source": "invalid"`
3. You'll see a red squiggle - hover over it to see the error message
4. Press `Ctrl+Z` to undo

### See autocomplete in action

1. Open any creature file
2. Delete the value after `"source":`
3. Press `Ctrl+Space` (Windows/Linux) or `Cmd+Space` (Mac)
4. VS Code shows the allowed values: "original", "student", "community"

### Explore the test files

The project root contains two test files for learning:

- `test-creature-valid.json` - A correct file with no errors
- `test-creature-errors.json` - A broken file showing common mistakes

Open `test-creature-errors.json` to see red squiggles highlighting these problems:

| Field        | Error                        | Fix                                       |
| ------------ | ---------------------------- | ----------------------------------------- |
| `source`     | "invalid-source" not in enum | Use "original", "student", or "community" |
| `tags`       | String instead of array      | Use `["tag1", "tag2"]`                    |
| `dateAdded`  | Wrong format                 | Use YYYY-MM-DD like "2026-02-12"          |
| `extraField` | Unknown field                | Remove it - only defined fields allowed   |

## Creating your creature file

### Step 1: Generate your ID

```bash
npm run gen-id
```

This outputs a unique 6-character hex ID like `a3f8c1`.

### Step 2: Create your file

Create a new file in `src/cows/` named with your ID:

```text
src/cows/a3f8c1.json
```

### Step 3: Start typing

As soon as you save the file, VS Code applies the schema. Type `{` and press `Ctrl+Space` to see all available fields with descriptions.

### Step 4: Fill in the fields

```json
{
  "name": "Your Creature Name",
  "author": "Your Name",
  "source": "student",
  "tags": ["category1", "category2"],
  "dateAdded": "2026-02-12",
  "art": "Your ASCII art here"
}
```

### Step 5: Check for errors

Look at the bottom-left of VS Code - it shows the error count for the current file. Click it to see the Problems panel. Fix any errors before committing.

## Field reference

| Field       | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `name`      | string | Yes      | Display name (1-50 characters)                              |
| `author`    | string | Yes      | Your name                                                   |
| `source`    | string | Yes      | Must be "original", "student", or "community"               |
| `tags`      | array  | Yes      | Categories like `["animal", "fantasy"]`                     |
| `dateAdded` | string | Yes      | ISO date: YYYY-MM-DD                                        |
| `art`       | string | Yes      | ASCII art with `$thoughts`, `$eyes`, `$tongue` placeholders |

## How the workspace settings work

The magic happens in `.vscode/settings.json`:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["src/cows/*.json"],
      "url": "./creature.schema.json"
    }
  ]
}
```

This tells VS Code: "Apply `creature.schema.json` to all JSON files matching `src/cows/*.json`."

Because this file is committed to the repo, everyone who clones it gets automatic validation - no manual setup required.

## The schema file

The schema is defined in `creature.schema.json` at the project root. Here's a simplified view:

```json
{
  "required": ["name", "author", "source", "tags", "dateAdded", "art"],
  "properties": {
    "name": { "type": "string", "maxLength": 50 },
    "source": { "enum": ["original", "student", "community"] },
    "tags": { "type": "array", "items": { "type": "string" } },
    "dateAdded": { "pattern": "^\\d{4}-\\d{2}-\\d{2}$" }
  },
  "additionalProperties": false
}
```

Key points:

- `required` lists fields that must be present
- `enum` restricts values to a specific list
- `pattern` enforces a format using regex
- `additionalProperties: false` rejects unknown fields

## Why this matters

JSON Schema validation catches errors before you submit your PR:

- Typos in field names
- Wrong data types
- Missing required fields
- Invalid enum values

This saves time for both you and the PR reviewer.

## Learn more

- [JSON Schema official site](https://json-schema.org/)
- [VS Code JSON editing](https://code.visualstudio.com/docs/languages/json)
