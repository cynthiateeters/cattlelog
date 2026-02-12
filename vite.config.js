/**
 * @fileoverview Vite configuration for Cattlelog.
 *
 * Vite is a modern build tool that provides:
 * - Fast development server with Hot Module Replacement (HMR)
 * - Optimized production builds
 * - Native ES module support
 * - Built-in JSON import support
 *
 * @see https://vitejs.dev/config/
 */

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
  },
});
