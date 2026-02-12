/**
 * Gallery module for displaying ASCII art creatures.
 */

import { cows } from "../cows/index.js";
import { replacePlaceholders } from "../lib/replacer.js";

/**
 * Render a cow's ASCII art with default face.
 *
 * @param {Object} cow - Cow object with art property
 * @returns {string} - Rendered ASCII art
 */
function renderArt(cow) {
  return replacePlaceholders(cow.art, {
    thoughts: "\\",
    eyes: "oo",
    tongue: "  ",
  });
}

/**
 * Create a card element for a cow.
 *
 * @param {Object} cow - Cow object
 * @returns {HTMLElement} - Card element
 */
function createCard(cow) {
  const card = document.createElement("div");
  card.className = "cow-card bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow";
  card.dataset.id = cow.id;
  card.dataset.name = cow.name.toLowerCase();

  const header = document.createElement("div");
  header.className = "flex justify-between items-start mb-2";

  const title = document.createElement("h2");
  title.className = "font-semibold text-gray-900";
  title.textContent = cow.name;

  const idBadge = document.createElement("code");
  idBadge.className = "text-xs bg-gray-100 px-2 py-1 rounded text-gray-500";
  idBadge.textContent = cow.id;

  header.appendChild(title);
  header.appendChild(idBadge);

  const pre = document.createElement("pre");
  pre.className = "cow-art text-xs overflow-x-auto";
  pre.textContent = renderArt(cow);

  const meta = document.createElement("div");
  meta.className = "mt-2 text-xs text-gray-500";
  meta.textContent = `by ${cow.author}`;

  card.appendChild(header);
  card.appendChild(pre);
  card.appendChild(meta);

  return card;
}

/**
 * Render all cows to the gallery.
 *
 * @param {HTMLElement} container - Gallery container element
 * @param {Object[]} cowList - Array of cow objects to display
 */
function renderGallery(container, cowList) {
  container.innerHTML = "";

  if (cowList.length === 0) {
    const empty = document.createElement("p");
    empty.className = "text-gray-500 col-span-full text-center py-8";
    empty.textContent = "No creatures found.";
    container.appendChild(empty);
    return;
  }

  for (const cow of cowList) {
    container.appendChild(createCard(cow));
  }
}

/**
 * Filter cows by search query.
 *
 * @param {string} query - Search query
 * @returns {Object[]} - Filtered cow list
 */
function filterCows(query) {
  const q = query.toLowerCase().trim();
  if (!q) return cows;

  return cows.filter(
    (cow) =>
      cow.name.toLowerCase().includes(q) ||
      cow.id.includes(q) ||
      cow.author.toLowerCase().includes(q) ||
      cow.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

/**
 * Initialize the gallery.
 */
export function initGallery() {
  const gallery = document.getElementById("gallery");
  const search = document.getElementById("search");

  if (!gallery) {
    console.error("Gallery container not found");
    return;
  }

  // Initial render
  renderGallery(gallery, cows);

  // Search handler
  if (search) {
    search.addEventListener("input", (e) => {
      const filtered = filterCows(e.target.value);
      renderGallery(gallery, filtered);
    });
  }

  console.log(`Cattlelog loaded: ${cows.length} creatures`);
}

export { cows, filterCows, renderGallery };
