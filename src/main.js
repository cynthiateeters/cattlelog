/**
 * @fileoverview Cattlelog application entry point.
 */

import "./gallery/gallery.css";
import { initGallery } from "./gallery/gallery.js";

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initGallery);
