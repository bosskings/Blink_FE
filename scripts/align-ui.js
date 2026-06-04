/* eslint-disable no-undef */
/*
 * Script: align-ui.js
 * Purpose: Sweep all .tsx files and replace inline fontFamily styles
 *          (e.g., style={{ fontFamily: "HankenGrotesk_700Bold" }})
 *          with Tailwind className tokens:
 *          - HankenGrotesk_100Thin     -> font-hankenThin
 *          - HankenGrotesk_300Light    -> font-hankenLight
 *          - HankenGrotesk_400Regular  -> font-hankenRegular
 *          - HankenGrotesk_500Medium   -> font-hankenMedium
 *          - HankenGrotesk_600SemiBold -> font-hankenSemiBold
 *          - HankenGrotesk_700Bold     -> font-hankenBold
 *          - HankenGrotesk_900Black    -> font-hankenBlack
 *
 * It keeps existing className values and appends the font token.
 * Runs idempotently (safe to run multiple times).
 */

const fs = require("fs");
const path = require("path");

const FONT_MAP = {
  HankenGrotesk_100Thin: "font-hankenThin",
  HankenGrotesk_300Light: "font-hankenLight",
  HankenGrotesk_400Regular: "font-hankenRegular",
  HankenGrotesk_500Medium: "font-hankenMedium",
  HankenGrotesk_600SemiBold: "font-hankenSemiBold",
  HankenGrotesk_700Bold: "font-hankenBold",
  HankenGrotesk_900Black: "font-hankenBlack",
};

const TARGET_EXT = [".tsx"];

function walk(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, callback);
    } else if (TARGET_EXT.includes(path.extname(entry.name))) {
      callback(fullPath);
    }
  }
}

function appendClassName(existingClass, newToken) {
  if (!existingClass) return newToken;
  // Avoid duplicate tokens
  const classes = existingClass.split(/\s+/).filter(Boolean);
  if (!classes.includes(newToken)) classes.push(newToken);
  return classes.join(" ");
}

function processFile(filePath) {
  let code = fs.readFileSync(filePath, "utf8");

  // Match style={{ fontFamily: "HankenGrotesk_700Bold" }} or single quotes
  const fontRegex =
    /style=\{\{[^}]*fontFamily:\s*['"](HankenGrotesk_\d+(?:Thin|Light|Regular|Medium|SemiBold|Bold|Black))['"][^}]*\}\}/g;

  let changed = false;
  code = code.replace(fontRegex, (match, fontKey, offset) => {
    const fontClass = FONT_MAP[fontKey];
    if (!fontClass) return match;

    // Look backward for className in the same tag
    // Very lightweight heuristic: find nearest className before style within the same tag start
    const tagStart = code.lastIndexOf("<", offset);
    const tagEnd = code.indexOf(">", offset);
    const tagSlice = code.slice(tagStart, tagEnd);

    const classRegex = /className=\{?"([^"]*)"\}?/;
    const classMatch = tagSlice.match(classRegex);

    let newClass = fontClass;
    if (classMatch) {
      const existing = classMatch[1];
      newClass = appendClassName(existing, fontClass);
      // Replace within tagSlice only to avoid messing code positions too much
      const updatedTagSlice = tagSlice.replace(
        classRegex,
        `className="${newClass}"`,
      );
      code = code.slice(0, tagStart) + updatedTagSlice + code.slice(tagEnd);
    } else {
      // Inject className right before style=
      const injected = tagSlice.replace(
        /(\s*)style=\{/,
        ` className="${newClass}"$1style={`,
      );
      code = code.slice(0, tagStart) + injected + code.slice(tagEnd);
    }

    // Remove the fontFamily prop from style block
    const styleCleaned = match.replace(
      /fontFamily:\s*['"]HankenGrotesk_\d+(?:Thin|Light|Regular|Medium|SemiBold|Bold|Black)['"],?\s*/g,
      "",
    );
    code = code.replace(match, styleCleaned);

    changed = true;
    return styleCleaned;
  });

  if (changed) {
    fs.writeFileSync(filePath, code, "utf8");
    console.log(`Updated: ${filePath}`);
  }
}

function main() {
  const root = path.resolve(__dirname, "..", "app");
  walk(root, processFile);
  const componentsRoot = path.resolve(__dirname, "..", "components");
  if (fs.existsSync(componentsRoot)) {
    walk(componentsRoot, processFile);
  }
}

main();
