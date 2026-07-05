# Debugging SaveAsRouter in VS Code

This extension has two separate JS execution contexts, each debugged differently.

---

## Prerequisites

- [Brave](https://brave.com) (or Chrome) installed at `/usr/bin/brave-browser`
- The **JavaScript Debugger** extension (built into VS Code — no install needed)
- Node dependencies installed: `npm install`

---

## Build Scripts

| Command | Use case |
|---|---|
| `npm run build` | Production build (minified) |
| `npm run build:dev` | Development build with source maps |
| `npm run build:watch` | Development build, rebuilds on file save |
| `npm run package` | Production build + creates `saveasrouter.zip` |

Use `build:dev` or `build:watch` when debugging so source maps are accurate and code is readable.

---

## Launch Configurations (`.vscode/launch.json`)

Two configurations are already set up:

### 1. `Debug Chrome Extension (background)`

Launches Brave with the extension loaded and a remote debugging port open. Use this to debug the **background service worker** (`background.js`).  To ensure the remote debugging port is open, Brave is launched with the `--remote-debugging-port=9222` flag.  If is it already running, you can use the **Attach to Chrome** configuration instead.

- Runs `npm: build` before launching
- Opens a specific tab URL automatically
- Connects VS Code to port `9222`

To use:

1. Set breakpoints in `background.js` or any file it imports
2. Press **F5** or select **Run → Start Debugging** with this configuration selected

> **Note:** The background service worker can also be inspected via `chrome://extensions` → click **Service Worker** next to SaveAsRouter.

### 2. `Attach to Chrome`

Attaches to an already-running Brave/Chrome instance. Use this when the browser is already open with remote debugging enabled, or after launching with configuration #1.

To use:

1. Ensure Brave is running with `--remote-debugging-port=9222`
2. Select **Attach to Chrome** and press **F5**

---

## Debugging the Content Script (`content.js`)

Content scripts run in the context of the web page, not the background worker, so they appear under a different target:

1. Open DevTools on any active tab (**F12**)
2. Go to **Sources** tab → expand **Content scripts** in the left panel
3. Find your script under the extension name
4. Set breakpoints there directly

Alternatively, add a `debugger;` statement in your source code, rebuild, and reload the extension — execution will pause when DevTools is open.

---

## Debugging Action Classes (`action/`)

Action files (e.g. `action/infographic/action.js`) are bundled into `dist/content.js`. Since `devtool: 'source-map'` is set in [webpack.config.js](webpack.config.js), the **Sources** panel in DevTools will show the original unbundled source files under the **webpack://** tree, making it possible to set breakpoints directly in action source files.

---

## Reload After Changes

After rebuilding, reload the extension in the browser:

- `chrome://extensions` → click the **refresh icon** on SaveAsRouter
- Or press **Ctrl+R** on the `chrome://extensions` page

If using `build:watch`, VS Code will rebuild automatically on save — you still need to manually reload the extension in the browser after each rebuild.

---

## Quick Checklist

- [ ] Run `npm run build:dev` (or `build:watch`)
- [ ] Load the project **root folder** as an unpacked extension at `chrome://extensions`
- [ ] Set breakpoints in VS Code
- [ ] Launch via **F5** using `Debug Chrome Extension (background)`
- [ ] Trigger the context menu in the browser to hit content script breakpoints
