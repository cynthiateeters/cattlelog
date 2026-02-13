# Introduction to Vite

> **Optional reading.** This tutorial explains the build tool used by Cattlelog. You don't need to understand Vite to complete the assignment — just run `npm run dev` and it works. Read this if you're curious about what's happening behind the scenes.

Vite (French for "fast") is a modern build tool that makes web development faster and more enjoyable.

---

## What is a build tool?

When you write code for the web, browsers need specific file formats. A build tool:

- Transforms your code into browser-ready files
- Bundles multiple files into fewer files
- Optimizes for performance

Without a build tool, you'd manually manage script tags and worry about browser compatibility.

---

## Why Vite?

Vite is popular because it's **fast**:

| Action               | Traditional tools | Vite       |
| -------------------- | ----------------- | ---------- |
| Start dev server     | 10-30 seconds     | < 1 second |
| See code changes     | 2-5 seconds       | Instant    |
| Build for production | Minutes           | Seconds    |

This speed comes from two innovations:

1. **Native ES modules** — Vite serves your code directly to the browser during development
2. **On-demand compilation** — Only processes files you actually need

---

## Two modes

Vite has two modes of operation:

### Development mode

```bash
npm run dev
```

- Starts a local server (usually `http://localhost:5173`)
- Hot Module Replacement (HMR) — changes appear instantly
- No bundling — files are served individually
- Fast startup

### Production build

```bash
npm run build
```

- Creates optimized files in `dist/` folder
- Bundles and minifies code
- Ready for deployment

---

## Project structure

A typical Vite project looks like this:

```text
project/
├── index.html          # Entry point (not in a folder!)
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.js         # JavaScript entry point
│   └── style.css       # Styles
└── dist/               # Built files (after npm run build)
```

Key difference from other tools: **`index.html` lives at the root**, not in a `public/` folder.

---

## The index.html file

Your `index.html` includes a script tag pointing to your JavaScript:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

Notice `type="module"` — this enables ES module syntax (`import`/`export`).

---

## Common commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Hot Module Replacement (HMR)

When you save a file, Vite instantly updates your browser without a full page refresh:

1. You edit `gallery.js`
2. Vite detects the change
3. Browser updates just that module
4. Page state is preserved (scroll position, form inputs)

This makes development feel immediate and responsive.

---

## Importing in Vite

Vite supports modern JavaScript imports:

```javascript
// Import JavaScript modules
import { createCard } from "./gallery.js";

// Import CSS (Vite handles it)
import "./style.css";

// Import JSON (Vite handles it)
import data from "./data.json";

// Import images (Vite gives you the URL)
import logo from "./logo.png";
```

No configuration needed — Vite understands these patterns automatically.

---

## Configuration

Most projects need minimal configuration. Here's Cattlelog's `vite.config.js`:

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
  },
});
```

That's it! Vite's defaults handle most cases.

---

## Vite vs other tools

| Tool    | Era  | Approach                       |
| ------- | ---- | ------------------------------ |
| Grunt   | 2012 | Task runner, config-heavy      |
| Gulp    | 2013 | Streaming, code-based config   |
| Webpack | 2014 | Bundler, powerful but complex  |
| Parcel  | 2017 | Zero-config bundler            |
| Vite    | 2020 | Native ES modules, instant HMR |

Vite represents the current generation — fast, simple, and built on native browser capabilities.

---

## What you need to know

For this project, remember:

1. `npm run dev` — Start the development server
2. `npm run build` — Create production files in `dist/`
3. Edit files and see changes instantly
4. `index.html` at root, not in `public/`

Everything else is handled for you.

---

## Learn more

- [Vite documentation](https://vitejs.dev/)
- [Why Vite](https://vitejs.dev/guide/why.html)
