# SaveAsRouter

A Chrome Extension that adds an "Offline" context menu with configurable sub-menu items to help manage saving media to the correct location.

## Features

- Adds a top-level "Offline" menu item to the right-click context menu
- Shows configurable sub-menu items defined in `config.json`
- Calls `perform_action(tag)` when a sub-menu item is selected
- Works with text, links, images, videos, and all other context menu targets

## Installation

### For Development (Manual Installation)

1. Clone this repository:
   ```bash
   git clone https://github.com/dax-westerman/SaveAsRouter.git
   cd SaveAsRouter
   ```

2. Open Chrome/Edge and navigate to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`

3. Enable "Developer mode" (toggle in the top right)

4. Click "Load unpacked" and select the `SaveAsRouter` directory

5. The extension icon should appear in your extensions toolbar

## Configuration

The menu structure is defined in `config.json`:

```json
{
  "Offline": [
    {
      "label": "menu1",
      "tag": "action1"
    },
    {
      "label": "menu2",
      "tag": "action2"
    }
  ]
}
```

- `label`: The text displayed in the sub-menu
- `tag`: The value passed to `perform_action()` when the menu item is clicked

## Usage

1. Right-click on any text, image, link, or other content on a webpage
2. Hover over "Offline" in the context menu
3. Select one of the sub-menu items (e.g., "menu1" or "menu2")
4. An alert will appear showing the selected tag (e.g., "action1" or "action2")

## Customization

### Modifying the Action

The default action simply shows an alert with the tag. To customize this behavior, edit the `perform_action` function in `background.js`:

```javascript
function perform_action(tag) {
  alert(tag);
  // Add your custom logic here
}
```

### Adding More Menu Items

Edit `config.json` to add more menu items:

```json
{
  "Offline": [
    {
      "label": "Save for Later",
      "tag": "save_later"
    },
    {
      "label": "Archive",
      "tag": "archive"
    },
    {
      "label": "Download",
      "tag": "download"
    }
  ]
}
```

After making changes to `config.json`, reload the extension:
1. Go to `chrome://extensions/`
2. Click the refresh icon on the SaveAsRouter extension

## Files

- `manifest.json` - Extension configuration (Manifest V3)
- `background.js` - Service worker that handles context menu creation and clicks
- `config.json` - Menu structure configuration
- `icons/` - Extension icons (16x16, 48x48, 128x128)

## Technical Details

- Built using Chrome Extension Manifest V3
- Uses the `contextMenus` API for menu creation
- Uses the `scripting` API to inject the action function into the active tab
- Uses the `storage` API to cache configuration

## License

This project is open source and available under the MIT License.
