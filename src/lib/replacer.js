/**
 * Escape dollar signs for regex replacement.
 * Dollar signs must be doubled before being used in a regex replace.
 *
 * @param {string} s - String to escape
 * @returns {string}
 */
function escapeRe(s) {
  if (s && s.replace) {
    return s.replace(/\$/g, "$$$$");
  }
  return s;
}

/**
 * Replace placeholders in ASCII art with actual values.
 *
 * @param {string} art - ASCII art template with placeholders
 * @param {Object} variables - Values to substitute
 * @param {string} variables.thoughts - Thought bubble character ("\\" or "o")
 * @param {string} variables.eyes - Two-character eye string
 * @param {string} variables.tongue - Two-character tongue string
 * @returns {string} - Processed ASCII art
 */
export function replacePlaceholders(art, variables) {
  const eyes = escapeRe(variables.eyes);
  const eyeL = eyes.charAt(0);
  const eyeR = eyes.charAt(1);
  const tongue = escapeRe(variables.tongue);

  return art
    .replace(/\$thoughts/g, variables.thoughts)
    .replace(/\$eyes/g, eyes)
    .replace(/\$tongue/g, tongue)
    .replace(/\$\{eyes\}/g, eyes)
    .replace(/\$eye/, eyeL)
    .replace(/\$eye/, eyeR)
    .replace(/\$\{tongue\}/g, tongue);
}
