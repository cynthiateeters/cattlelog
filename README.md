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

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:5173> to view the gallery.

## Project structure

```text
cattlelog/
├── src/
│   ├── cows/           # JSON creature files
│   ├── gallery/        # Gallery UI components
│   ├── lib/            # Core rendering functions
│   └── main.js         # Application entry point
├── scripts/            # Build utilities
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
