# Cattlelog project context

This is an ASCII art creature gallery built with Vite. Contributors add JSON creature files that display in a web gallery.

## Project structure

- `src/cows/*.json` - creature files with 6-character hex IDs
- `src/cows/creature.schema.json` - JSON Schema for validation
- `src/cows/index.js` - auto-generated export of all creatures
- `docs/` - contributor documentation

## Key commands

- `npm run gen-id` - generate a unique creature ID
- `npm run see-cow src/cows/ID.json` - preview creature in terminal
- `npm run build:index` - rebuild the gallery index
- `npm run dev` - start local dev server

## Contribution workflow

Fork → Clone → Branch (`add-cow-USERNAME`) → Create JSON → PR

See `docs/guides/fork-workflow.md` for the complete guide.

## JSON creature format

```json
{
  "$schema": "./creature.schema.json",
  "name": "Creature Name",
  "author": "Your Name",
  "source": "community",
  "tags": ["tag1", "tag2"],
  "dateAdded": "YYYY-MM-DD",
  "art": "ASCII art with $thoughts placeholder"
}
```

## ASCII art tips

- Use `$thoughts` where the speech bubble should connect
- Escape backslashes: `\\` becomes `\`
- Escape newlines: `\n` for line breaks
- Test with `npm run see-cow` before committing

## Your instructions

Add your own preferences below this line:
