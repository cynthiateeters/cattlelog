# Cattlelog

ASCII art creature gallery - a teaching tool for JavaScript array methods.

```text
 ___________________
< Welcome to class! >
 -------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## About

Cattlelog transforms the classic cowsay collection into an interactive gallery for learning JavaScript. Students explore array methods like `filter()`, `map()`, and `find()` while browsing ASCII art creatures.

## Beginner's guide

New to the project? Start here:

1. **[Assignment instructions](docs/INSTRUCTIONS.md)** — Step-by-step guide to fork, clone, and contribute your creature
2. **[Assignment checklist](docs/CHECKLIST.md)** — Verify your work before submitting

### Guides

- **[Making ASCII art](docs/guides/making-cows.md)** — Create creatures (hand-drawn, web search, AI)
- **[Fork workflow](docs/guides/fork-workflow.md)** — Git fork, clone, branch, PR process
- **[Troubleshooting](docs/guides/troubleshooting.md)** — Fix common problems

### Tutorials (optional)

- **[Intro to Vite](docs/tutorials/intro-to-vite.md)** — Understanding the build tool
- **[Tailwind CSS](docs/tutorials/tailwind-css.md)** — Utility-first CSS basics

### Reference

- **[JSON schema validation](docs/reference/json-schema-validation.md)** — How VS Code validates your creature file
- **[Scripts reference](docs/reference/scripts.md)** — npm scripts for creating and testing creatures

## Quick start

```bash
npm install
npm run dev
```

Open the localhost URL shown in terminal to view the gallery.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests (Vitest)
- `npm run gen-id` - Generate unique creature ID
- `npm run see-cow <file>` - Preview creature with speech bubble
- `npm run build:index` - Rebuild cow index

## Project structure

```text
cattlelog/
├── src/
│   ├── cows/           # JSON creature files (189 creatures)
│   ├── gallery/        # Gallery UI components
│   ├── lib/            # Core rendering functions
│   └── main.js         # Application entry point
├── scripts/            # Build utilities
├── test/               # Vitest tests
└── index.html          # Gallery entry point
```

## Adding a creature

1. Generate a unique ID: `npm run gen-id`
2. Create `src/cows/{id}.json` with your ASCII art
3. Run `npm run build:index` to update the index
4. Submit a pull request

## Acknowledgments

Cattlelog is built on the work of others:

- **[cowsay](https://github.com/piuccio/cowsay)** - JavaScript implementation by [Fabio Crisci](https://github.com/piuccio) (MIT License)
- **[Original cowsay](https://github.com/tnalpgge/rank-amateur-cowsay)** - Perl program by Tony Monroe

The original ASCII art creatures in `src/cows/` are derived from the cowsay project. Newer creatures are contributed by participants in this open source project.

## License

MIT License - see [LICENSE](LICENSE) for details.
