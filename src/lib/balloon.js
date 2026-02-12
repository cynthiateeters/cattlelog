/**
 * Get the visual width of a string (handles Unicode properly).
 * Simple implementation for browser use - counts characters,
 * treating wide chars (CJK, emoji) as width 2.
 *
 * @param {string} str - String to measure
 * @returns {number} - Visual width
 */
function stringWidth(str) {
  let width = 0;
  for (const char of str) {
    const code = char.codePointAt(0);
    // CJK characters and some symbols are "wide"
    if (
      (code >= 0x1100 && code <= 0x115f) || // Hangul Jamo
      (code >= 0x2e80 && code <= 0xa4cf) || // CJK
      (code >= 0xac00 && code <= 0xd7a3) || // Hangul Syllables
      (code >= 0xf900 && code <= 0xfaff) || // CJK Compatibility
      (code >= 0xfe10 && code <= 0xfe1f) || // Vertical forms
      (code >= 0xfe30 && code <= 0xfe6f) || // CJK Compatibility Forms
      (code >= 0xff00 && code <= 0xff60) || // Fullwidth Forms
      (code >= 0xffe0 && code <= 0xffe6) || // Fullwidth Signs
      (code >= 0x20000 && code <= 0x2fffd) || // CJK Extension B+
      (code >= 0x30000 && code <= 0x3fffd) // CJK Extension G+
    ) {
      width += 2;
    } else if (code >= 0x1f300 && code <= 0x1f9ff) {
      // Emoji
      width += 2;
    } else {
      width += 1;
    }
  }
  return width;
}

/**
 * Create a speech balloon around text.
 *
 * @param {string} text - Text to wrap
 * @param {number} [wrap] - Maximum line width (optional)
 * @returns {string} - Text wrapped in speech balloon
 */
export function say(text, wrap) {
  const delimiters = {
    first: ["/", "\\"],
    middle: ["|", "|"],
    last: ["\\", "/"],
    only: ["<", ">"],
  };

  return format(text, wrap, delimiters);
}

/**
 * Create a thought balloon around text.
 *
 * @param {string} text - Text to wrap
 * @param {number} [wrap] - Maximum line width (optional)
 * @returns {string} - Text wrapped in thought balloon
 */
export function think(text, wrap) {
  const delimiters = {
    first: ["(", ")"],
    middle: ["(", ")"],
    last: ["(", ")"],
    only: ["(", ")"],
  };

  return format(text, wrap, delimiters);
}

function format(text, wrap, delimiters) {
  const lines = split(text, wrap);
  const maxLength = max(lines);

  let balloon;
  if (lines.length === 1) {
    balloon = [
      " " + top(maxLength),
      delimiters.only[0] + " " + lines[0] + " " + delimiters.only[1],
      " " + bottom(maxLength),
    ];
  } else {
    balloon = [" " + top(maxLength)];

    for (let i = 0; i < lines.length; i++) {
      let delimiter;

      if (i === 0) {
        delimiter = delimiters.first;
      } else if (i === lines.length - 1) {
        delimiter = delimiters.last;
      } else {
        delimiter = delimiters.middle;
      }

      balloon.push(
        delimiter[0] + " " + pad(lines[i], maxLength) + " " + delimiter[1]
      );
    }

    balloon.push(" " + bottom(maxLength));
  }

  return balloon.join("\n");
}

function split(text, wrap) {
  text = text
    .replace(/\r\n?|[\n\u2028\u2029]/g, "\n")
    .replace(/^\uFEFF/, "")
    .replace(/\t/g, "        ");

  const lines = [];
  if (!wrap) {
    return text.split("\n");
  }

  let start = 0;
  while (start < text.length) {
    const nextNewLine = text.indexOf("\n", start);
    const wrapAt = Math.min(
      start + wrap,
      nextNewLine === -1 ? text.length : nextNewLine
    );

    lines.push(text.substring(start, wrapAt));
    start = wrapAt;

    if (text.charAt(start) === "\n") {
      start += 1;
    }
  }

  return lines;
}

function max(lines) {
  let maxWidth = 0;
  for (const line of lines) {
    const width = stringWidth(line);
    if (width > maxWidth) {
      maxWidth = width;
    }
  }
  return maxWidth;
}

function pad(text, length) {
  return text + " ".repeat(length - stringWidth(text));
}

function top(length) {
  return "_".repeat(length + 2);
}

function bottom(length) {
  return "-".repeat(length + 2);
}
