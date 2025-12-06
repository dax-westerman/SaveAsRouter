# SaveAsRouter - Architecture Overview

## Extension Structure

```
SaveAsRouter/
├── manifest.json          # Extension configuration (Manifest V3)
├── background.js          # Service worker for context menu logic
├── config.json           # Menu structure configuration
├── icons/                # Extension icons
│   ├── icon16.png       # 16x16 toolbar icon
│   ├── icon48.png       # 48x48 extension management
│   └── icon128.png      # 128x128 Chrome Web Store
├── test.html            # Test page for manual testing
├── README.md            # User documentation
├── INSTALLATION_GUIDE.md # Detailed installation steps
└── ARCHITECTURE.md      # This file

```

## Component Flow

```
User Action (Right-click)
        ↓
Chrome Context Menu API
        ↓
"Offline" Parent Menu Item
        ↓
Sub-menu Items (from config.json)
        ↓
Menu Item Click Event
        ↓
background.js (onClicked listener)
        ↓
Retrieve config from chrome.storage
        ↓
Extract tag for clicked menu item
        ↓
Inject perform_action(tag) into active tab
        ↓
Function executes in page context
        ↓
Alert displays tag value
```

## Key Components

### 1. manifest.json
- **Purpose**: Defines extension metadata and permissions
- **Manifest Version**: 3 (latest standard)
- **Permissions**:
  - `contextMenus`: Create right-click menu items
  - `storage`: Cache configuration data
  - `scripting`: Inject JavaScript into pages
  - `activeTab`: Access current tab for script injection

### 2. background.js (Service Worker)
- **Lifecycle**: Event-driven, activates on-demand
- **Key Functions**:
  - `setupContextMenus()`: Loads config and creates menu items
  - `chrome.contextMenus.onClicked`: Handles menu selections
  - `perform_action(tag)`: Function injected into pages

**Flow**:
1. Service worker starts → loads config.json
2. Creates parent menu item "Offline"
3. Creates sub-menu items from config
4. Stores config in chrome.storage.local
5. Listens for menu click events
6. On click: retrieves config, finds tag, injects perform_action

### 3. config.json
- **Purpose**: Defines menu structure
- **Format**:
```json
{
  "Offline": [
    {"label": "Display Text", "tag": "action_identifier"},
    ...
  ]
}
```
- **Extensibility**: Add unlimited menu items
- **Reloading**: Requires extension reload to apply changes

### 4. Context Menu Integration
- **Menu ID**: `offline-parent` (parent)
- **Sub-menu IDs**: `offline-0`, `offline-1`, etc. (indexed)
- **Contexts**: `['all']` - appears for all right-click targets
  - Text selection
  - Links
  - Images
  - Videos
  - Audio
  - Pages
  - Frames

## Data Flow

### Configuration Loading
```
Extension Install/Update
        ↓
background.js loads
        ↓
fetch('config.json')
        ↓
Parse JSON
        ↓
chrome.storage.local.set({menuConfig: config})
        ↓
Create context menu items
```

### Action Execution
```
User clicks menu item
        ↓
chrome.contextMenus.onClicked fires
        ↓
Extract menu item ID (e.g., "offline-2")
        ↓
Parse index from ID (e.g., 2)
        ↓
Retrieve config from chrome.storage.local
        ↓
Get menuItem = config.Offline[index]
        ↓
chrome.scripting.executeScript({
  target: {tabId: tab.id},
  func: perform_action,
  args: [menuItem.tag]
})
        ↓
Function runs in page context
        ↓
alert(tag) displays
```

## Extension Lifecycle

### Installation
1. User loads unpacked extension
2. `chrome.runtime.onInstalled` fires
3. `setupContextMenus()` executes
4. Context menus become available

### Service Worker Activation
1. Browser starts service worker as needed
2. Service worker runs `setupContextMenus()` on startup
3. Service worker idles after 30 seconds of inactivity
4. Reactivates on menu interaction

### Configuration Updates
1. User edits `config.json`
2. User clicks reload on `chrome://extensions/`
3. Service worker restarts
4. New configuration loads
5. Menu items update

## API Usage

### Chrome APIs Used

#### contextMenus API
```javascript
// Create parent menu
chrome.contextMenus.create({
  id: 'offline-parent',
  title: 'Offline',
  contexts: ['all']
});

// Create sub-menu
chrome.contextMenus.create({
  id: 'offline-0',
  parentId: 'offline-parent',
  title: 'menu1',
  contexts: ['all']
});

// Listen for clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Handle click
});
```

#### storage API
```javascript
// Store configuration
await chrome.storage.local.set({ menuConfig: config });

// Retrieve configuration
const result = await chrome.storage.local.get('menuConfig');
const config = result.menuConfig;
```

#### scripting API
```javascript
// Inject and execute function
await chrome.scripting.executeScript({
  target: { tabId: tab.id },
  func: perform_action,
  args: [tag]
});
```

## Customization Points

### 1. Menu Structure
Edit `config.json` to:
- Add/remove menu items
- Change labels
- Change action tags

### 2. Action Function
Edit `perform_action()` in `background.js` to:
- Perform custom actions
- Make API calls
- Store data
- Download content
- Manipulate page elements

### 3. Menu Contexts
Edit `contexts` array in `chrome.contextMenus.create()`:
- `'selection'`: Only on text selection
- `'link'`: Only on links
- `'image'`: Only on images
- `'video'`: Only on videos
- `'audio'`: Only on audio
- `'page'`: Only on page (no element)
- `'all'`: All contexts (current setting)

### 4. Visual Styling
Replace icons in `icons/` directory:
- `icon16.png`: Toolbar icon
- `icon48.png`: Extension management
- `icon128.png`: Chrome Web Store/detail page

## Security Considerations

### Permissions Justification
- **contextMenus**: Required for core functionality
- **storage**: Minimal data (config only), no sensitive info
- **scripting**: Limited to activeTab, user-initiated
- **activeTab**: Only when user clicks menu item

### Data Privacy
- No external network requests
- No user tracking
- No data collection
- Configuration stored locally only

### Code Injection
- Only injects predefined `perform_action()` function
- Runs in isolated context
- User must explicitly click menu item
- No automatic or background injection

## Testing Strategy

### Manual Testing
1. Load extension in developer mode
2. Open `test.html`
3. Right-click on various elements
4. Verify menu appears
5. Click menu items
6. Verify alerts appear with correct tags

### Cross-Browser Testing
- Test in Chrome, Edge, Brave
- Verify all context menu scenarios
- Test with various web page types

### Configuration Testing
- Test with empty config
- Test with many menu items (20+)
- Test with special characters in labels
- Test with very long labels

## Future Enhancements

Potential improvements:
1. **Dynamic Config**: Load config from URL or API
2. **Icon Customization**: Per-menu-item icons
3. **Keyboard Shortcuts**: Alt+O for quick access
4. **Action History**: Track which actions were used
5. **Conditional Menus**: Show different menus based on context
6. **Multi-level Menus**: Nested sub-menus
7. **Options Page**: GUI for configuration
8. **Export/Import**: Share configurations
9. **Cloud Sync**: Sync config across devices
10. **Action Plugins**: Extensible action system

## References

- [Chrome Extensions Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)
- [contextMenus API](https://developer.chrome.com/docs/extensions/reference/contextMenus/)
- [scripting API](https://developer.chrome.com/docs/extensions/reference/scripting/)
- [storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
