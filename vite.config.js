/**
 * @fileoverview Vite configuration for Cattlelog.
 *
 * Vite is a modern build tool that provides:
 * - Fast development server with Hot Module Replacement (HMR)
 * - Optimized production builds
 * - Native ES module support
 * - Built-in JSON import support
 *
 * Tailwind CSS v4 is integrated via the official Vite plugin,
 * which replaces the legacy PostCSS plugin approach.
 *
 * @see https://vitejs.dev/config/
 * @see https://tailwindcss.com/docs/installation/vite
 */

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
  },
});
