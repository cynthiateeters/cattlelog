# Making ASCII art creatures

Three ways to create your creature: draw it yourself, find existing art online, or generate it with AI. Each approach is valid — choose what works for you.

---

## Hand-drawn

Creating ASCII art from scratch gives you complete control. Start simple.

### Planning your creature

1. **Sketch on paper first** — draw your character, then figure out which ASCII characters could represent each part
2. **Start with the outline** — use characters like `/`, `\`, `|`, `_`, `-` for edges
3. **Add details** — eyes, texture, features

### Useful characters

| Character | Use for                    |
| --------- | -------------------------- |
| `/ \`     | Diagonal lines, ears, legs |
| `\| _`    | Vertical and horizontal    |
| `( )`     | Curves, heads, bodies      |
| `o O @`   | Eyes, buttons              |
| `^ v`     | Ears, beaks, points        |
| `. :`     | Texture, dots              |
| `= ~`     | Mouths, waves              |

### Example: Simple cat

```text
  /\_/\
 ( o.o )
  > ^ <
```

### Tips

- Keep it under 40 characters wide
- Use a monospace font while editing
- Test frequently with `npm run see-cow`

---

## Web search

ASCII art has been around since the 1960s. Many archives exist online.

### Dedicated ASCII art sites

- **ASCII Art Archive** — asciiart.eu
- **Christopher Johnson's collection** — chris.com/ascii
- **ASCII Art Dictionary** — ascii.co.uk

### Search tips

- Search for "[animal] ASCII art" or "[object] text art"
- Look for art that's compact (under 40 chars wide)
- Simpler art converts better to the creature format

### Converting found art

1. Copy the art into your JSON file's `art` field
2. Add `$thoughts` — a diagonal line pointing to the creature
3. Replace the eyes with `$eyes` placeholder (optional)
4. Add `$tongue` if the creature has a mouth (optional)
5. Test with `npm run see-cow` to verify

### Attribution

- Set `"source": "adapted"` in your JSON
- Note the original source in your PR description
- Respect any licensing on the original art

---

## AI-generated

AI tools can create ASCII art quickly, but the output often needs fixing. That's not a flaw — it's a feature. When AI makes mistakes (wrong escaping, broken formatting, abstract art), you learn by debugging and fixing them. This is exactly how professional developers work with AI tools.

### Prompting tips

Ask for something specific:

> Create ASCII art of a small owl, under 30 characters wide, using only standard keyboard characters

Better prompts include:

- Size constraints ("under 30 chars wide")
- Character restrictions ("standard keyboard characters only")
- Style guidance ("simple", "minimalist", "detailed")

### What to ask for

You can prompt AI for either:

- **Just the art** — then paste it into the `art` field of your JSON file
- **The complete JSON file** — ask it to follow `creature.schema.json`

Either way, **you are responsible for a file that validates**. VS Code will show red squiggles if something is wrong. Use `npm run see-cow` to verify the art renders correctly.

### Common issues to fix

| Problem                   | Solution                                     |
| ------------------------- | -------------------------------------------- |
| Art is too wide           | Ask for smaller, or manually trim            |
| Uses Unicode/emoji        | Ask for "ASCII only" or replace manually     |
| Over-escaped backslashes  | In JSON, `\\` becomes `\` — check for `\\\\` |
| Abstract/unrecognizable   | Start over with a simpler prompt             |
| Missing thought connector | Add `$thoughts` diagonal manually            |

### After AI generates art

1. **Preview immediately** — run `npm run see-cow` before anything else
2. **Check the diagonal** — does `$thoughts` form a proper line to your creature?
3. **Verify backslashes** — JSON escaping is tricky; AI often gets it wrong
4. **Confirm it's recognizable** — if you can't tell what it is, neither can anyone else

### Example workflow

```text
1. Prompt AI: "Create simple ASCII art of a penguin, 20 chars wide"
2. Copy output to docs/json-playground/test.json
3. Run: npm run see-cow docs/json-playground/test.json
4. Fix issues (escaping, $thoughts placement)
5. Repeat until it looks right
6. Move to src/cows/YOUR-ID.json
```

---

## Verification checklist

Regardless of how you created your creature:

- [ ] Run `npm run see-cow src/cows/YOUR-ID.json`
- [ ] Art displays correctly (not jumbled)
- [ ] `$thoughts` forms diagonal line to creature
- [ ] Creature is recognizable
- [ ] Width is reasonable (under 40 chars)

---

## The playground

Use `docs/json-playground/` to experiment before adding to `src/cows/`. Files there won't affect the gallery but still get JSON validation.

```bash
# Test a work-in-progress
npm run see-cow docs/json-playground/my-test.json
```
