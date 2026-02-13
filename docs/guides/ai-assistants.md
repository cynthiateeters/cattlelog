# Working with AI assistants

AI coding assistants like GitHub Copilot can help you work faster, but learning to use them effectively is a skill. This guide helps you get started.

## The instructions file

This repository includes `.github/copilot-instructions.md` which gives Copilot context about the project. When you fork the repo, you inherit these instructions.

### Customizing for yourself

After forking, you can edit the instructions file to add your own preferences at the bottom:

```markdown
## Your instructions

- I prefer brief explanations
- Show me the simplest solution first
- I'm new to Git, explain commands before running them
```

There's no "right" set of instructions. Experiment and find what helps you learn.

## Useful prompts to try

### Understanding the project

```
@workspace how does the creature gallery work?
```

```
#file:src/cows/creature.schema.json what fields are required?
```

### Getting help with your creature

```
Explain why my JSON has a red squiggle on line 7
```

```
How do I escape a backslash in JSON?
```

### Git workflow questions

```
@workspace what branch name should I use?
```

```
How do I sync my fork with upstream?
```

## Tips for effective prompting

### Be specific

Instead of: "Help me with my creature"

Try: "My ASCII art backslashes are disappearing when I run see-cow"

### Reference files

Use `#file:path` to point Copilot at specific files:

```
#file:src/cows/a1b2c3.json why doesn't this validate?
```

### Ask for explanations

Don't just accept code - ask why:

```
Explain what this escape sequence does: \\n
```

## Learn your own way

Different people work with AI assistants differently. Some preferences to explore:

- **Explanation depth:** Do you want brief answers or detailed explanations?
- **Code vs. guidance:** Should AI write code for you or guide you to write it yourself?
- **Learning style:** Do examples help more than explanations?

Update your instructions file as you discover what works for you.

## Caution

AI assistants can be wrong. Always:

- Test code before committing (`npm run see-cow`)
- Verify suggestions against the documentation
- Ask "why" if something doesn't make sense

The goal is to learn, not just to get answers.
