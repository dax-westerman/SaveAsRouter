# Webpack Setup for SaveAsRouter Chrome Extension

## Build Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the extension:
   ```bash
   npm run build
   ```
   This will output bundled files to the `dist/` directory.

3. Update your `manifest.json` to reference `dist/background.js` and `dist/content.js` (already done).

4. Load the `dist/` output in Chrome as your extension's background and content scripts.

## Notes
- Source files remain in the root; only `dist/` is loaded by Chrome.
- You can now use ES module imports/exports in your source files.
