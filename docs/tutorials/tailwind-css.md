# Tailwind CSS basics

> **Optional reading.** This tutorial explains the CSS framework used by the gallery. You don't need to understand Tailwind to complete the assignment — your creature file is JSON, not CSS. Read this if you're curious about how the gallery is styled.

Tailwind is a utility-first CSS framework. Instead of writing custom CSS, you apply pre-built classes directly in your HTML.

---

## Traditional CSS vs Tailwind

### Traditional approach

```html
<button class="primary-button">Click me</button>
```

```css
.primary-button {
  background-color: hsl(217, 91%, 60%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
```

### Tailwind approach

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded">Click me</button>
```

No CSS file needed — the styles are built into the class names.

---

## Why utility classes?

Benefits of Tailwind:

- **No naming** — You don't invent class names like `.card-wrapper-inner`
- **No context switching** — Styles are right in your HTML
- **Consistent spacing** — Pre-defined scale (4, 8, 12, 16px, etc.)
- **Responsive built-in** — `md:text-lg` applies at medium screens

Tradeoffs:

- HTML can look cluttered
- Learning the class names takes time
- Not semantic (classes describe appearance, not meaning)

---

## Common utilities

### Spacing

Tailwind uses a numeric scale where `1` = `0.25rem` (4px):

| Class  | CSS                          | Pixels |
| ------ | ---------------------------- | ------ |
| `p-1`  | `padding: 0.25rem`           | 4px    |
| `p-2`  | `padding: 0.5rem`            | 8px    |
| `p-4`  | `padding: 1rem`              | 16px   |
| `m-4`  | `margin: 1rem`               | 16px   |
| `px-4` | `padding-left/right: 1rem`   | 16px   |
| `py-2` | `padding-top/bottom: 0.5rem` | 8px    |

### Colors

Colors use a name + shade pattern:

```html
<div class="bg-blue-500 text-white">Blue background</div>
<div class="bg-gray-100 text-gray-900">Light gray</div>
<div class="border border-red-500">Red border</div>
```

Shades go from `50` (lightest) to `950` (darkest).

### Typography

```html
<p class="text-sm">Small text</p>
<p class="text-base">Base text (default)</p>
<p class="text-lg">Large text</p>
<p class="text-xl">Extra large</p>
<p class="font-bold">Bold</p>
<p class="text-center">Centered</p>
```

### Flexbox and Grid

```html
<!-- Flexbox row with gap -->
<div class="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Centered content -->
<div class="flex items-center justify-center">Centered</div>

<!-- Grid with 3 columns -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

### Sizing

```html
<div class="w-full">Full width</div>
<div class="w-1/2">Half width</div>
<div class="h-64">Fixed height (16rem)</div>
<div class="max-w-md">Max width medium</div>
```

---

## Responsive design

Tailwind uses breakpoint prefixes:

| Prefix | Min width | Typical use  |
| ------ | --------- | ------------ |
| `sm:`  | 640px     | Large phones |
| `md:`  | 768px     | Tablets      |
| `lg:`  | 1024px    | Laptops      |
| `xl:`  | 1280px    | Desktops     |

Example — stack on mobile, side-by-side on tablet:

```html
<div class="flex flex-col md:flex-row gap-4">
  <div>Left</div>
  <div>Right</div>
</div>
```

---

## How Tailwind works in this project

Tailwind is already configured. The key files:

```text
cattlelog/
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS (processes Tailwind)
└── src/
    └── gallery/
        └── gallery.css   # Imports Tailwind
```

The CSS file imports Tailwind's layers:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Vite processes this automatically — you just write classes in HTML.

---

## Reading existing Tailwind

When you see a class string like this:

```html
<article
  class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
></article>
```

Break it down:

| Class             | What it does                    |
| ----------------- | ------------------------------- |
| `bg-white`        | White background                |
| `rounded-lg`      | Large border radius             |
| `shadow`          | Box shadow                      |
| `p-4`             | Padding 1rem (16px)             |
| `hover:shadow-lg` | Larger shadow on hover          |
| `transition`      | Smooth animation between states |

---

## Finding classes

When you need a specific style:

1. **Guess** — Try logical names like `text-center`, `bg-red-500`
2. **VS Code IntelliSense** — Type and see suggestions
3. **Documentation** — [tailwindcss.com/docs](https://tailwindcss.com/docs)
4. **Cheat sheet** — [tailwindcomponents.com/cheatsheet](https://tailwindcomponents.com/cheatsheet/)

---

## For this project

You probably won't need to write much Tailwind — the gallery is already styled. But understanding the classes helps you:

- Read existing code
- Make small adjustments
- Debug layout issues

Focus on recognizing patterns rather than memorizing everything.

---

## Learn more

- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [Tailwind Play](https://play.tailwindcss.com/) — Online playground
