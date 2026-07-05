# SaveAsRouter - Installation and Testing Guide

## Installation Steps

### 1. Load the Extension in Chrome/Edge

1. Open your browser and navigate to:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`

2. Enable **Developer mode** by toggling the switch in the top-right corner

3. Click the **"Load unpacked"** button

4. Navigate to and select the `SaveAsRouter` folder

5. The extension should now appear in your extensions list with the "O" icon

### 2. Verify Installation

After loading, you should see:
- Extension name: "SaveAsRouter - Offline Menu"
- Version: 1.0.0
- Status: Enabled
- Icon: Blue square with white "O"

## Testing the Extension

### Using the Test Page

1. Open `test.html` in your browser (double-click the file or drag it to your browser)

2. Right-click on any of the test areas:
   - Text content
   - Hyperlinks
   - Images

3. Look for the **"Offline"** menu item in the context menu

4. Hover over "Offline" to reveal the sub-menu with:
   - menu1
   - menu2

5. Click on either menu item:
   - Selecting "menu1" will show an alert: `action1`
   - Selecting "menu2" will show an alert: `action2`

### Testing on Real Websites

1. Navigate to any website (e.g., https://www.github.com)

2. Right-click on:
   - Any text on the page
   - Any image
   - Any link
   - Any video

3. The "Offline" menu should appear in all contexts

4. Select a sub-menu item to trigger the action

## Context Menu Structure

```
Right-click menu
├── ...existing menu items...
├── Offline                    ← Top-level menu (added by extension)
│   ├── menu1                 ← Triggers perform_action("action1")
│   └── menu2                 ← Triggers perform_action("action2")
└── ...existing menu items...
```

## Customization

### Modifying Menu Items

Edit `config.json` to change the menu structure:

```json
{
  "Offline": [
    {
      "label": "Your Custom Label",
      "tag": "your_custom_tag"
    },
    {
      "label": "Another Option",
      "tag": "another_tag"
    }
  ]
}
```

After editing:
1. Go to `chrome://extensions/`
2. Find "SaveAsRouter - Offline Menu"
3. Click the refresh/reload icon
4. The changes will take effect immediately

### Modifying the Action

Edit the `perform_action` function in `background.js`:

```javascript
function perform_action(tag) {
  // Default behavior: show alert
  alert(tag);
  
  // Add your custom logic here, for example:
  // - Save to local storage
  // - Send to a backend API
  // - Download the current page/image
  // - etc.
}
```

After editing, reload the extension from `chrome://extensions/`.

## Troubleshooting

### Menu Not Appearing

1. **Check Extension Status**: Go to `chrome://extensions/` and ensure the extension is enabled
2. **Reload the Extension**: Click the refresh icon on the extension card
3. **Check Console**: Right-click the extension and select "Inspect views: service worker" to see console logs

### Alert Not Showing

1. **Check Pop-up Blocker**: Ensure your browser isn't blocking alerts
2. **Check Browser Console**: Press F12 to open developer tools and check for errors
3. **Verify Configuration**: Make sure `config.json` is properly formatted

### Configuration Not Loading

1. **Validate JSON**: Use a JSON validator to check `config.json` for syntax errors
2. **Check File Location**: Ensure `config.json` is in the same directory as `manifest.json`
3. **Reload Extension**: Always reload after making configuration changes

## Development Notes

- The extension uses **Manifest V3** (the latest Chrome extension format)
- The background script runs as a **service worker** (not a persistent background page)
- Context menus are created on extension installation and service worker startup
- The configuration is cached in `chrome.storage.local` for quick access

## Browser Compatibility

- ✅ Chrome 88+
- ✅ Microsoft Edge 88+
- ✅ Brave
- ✅ Vivaldi
- ⚠️ Firefox (Manifest V3 support varies, may need modifications)
- ⚠️ Safari (Requires conversion to Safari Web Extension format)

## Security Notes

- This extension requires minimal permissions:
  - `contextMenus`: To add menu items
  - `storage`: To cache configuration
  - `scripting`: To inject the action function
  - `activeTab`: To interact with the current tab

- No data is sent to external servers
- No user data is collected or stored
- Open source and auditable
