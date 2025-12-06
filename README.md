# SaveAsRouter
A Chrome Extension to help manage saving media to the correct location

## Features
- Adds a top-level "Offline" menu to the browser's right-click context menu
- Sub-menu items are configurable via `config.json`
- Clicking a sub-menu item triggers an action with the configured tag

## Installation
1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the directory containing this extension

## Usage
1. Right-click anywhere on a web page
2. Select "Offline" from the context menu
3. Choose one of the sub-menu options
4. An alert will display the action tag associated with that menu item

## Configuration
Edit `config.json` to customize the menu items:
```json
{
  "Offline": [
    {"label": "menu1", "tag": "action1"},
    {"label": "menu2", "tag": "action2"}
  ]
}
```

- `label`: The text displayed in the menu
- `tag`: The action identifier passed to the `perform_action` function

## Customization
The `perform_action` function in `background.js` currently shows an alert. You can modify this function to perform any action you need with the tag parameter.
