// Background service worker for SaveAsRouter Chrome Extension


// Load configuration and create context menus
async function setupContextMenus() {
  try {
    // Fetch the configuration
    const response = await fetch(chrome.runtime.getURL('config.json'));
    const config = await response.json();

    // Remove existing menus
    await chrome.contextMenus.removeAll();

    // Get the menu configuration
    const offlineMenus = config.Offline || [];

    if (offlineMenus.length === 0) {
      console.warn('No menu items found in config.json');
      return;
    }

    // Create parent menu item "Offline"
    chrome.contextMenus.create({
      id: 'offline-parent',
      title: 'Offline',
      contexts: ['all'] // Show for all contexts (text, links, images, videos, etc.)
    });

    // Create sub-menu items
    offlineMenus.forEach((menuItem, index) => {
      chrome.contextMenus.create({
        id: `offline-${index}`,
        parentId: 'offline-parent',
        title: menuItem.label,
        contexts: ['all']
      });
    });

    // Store config in chrome storage for later access
    await chrome.storage.local.set({ menuConfig: config });

    console.log('Context menus created successfully');
  } catch (error) {
    console.error('Error setting up context menus:', error);
  }
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  // Check if it's one of our menu items
  if (info.menuItemId.startsWith('offline-') && info.menuItemId !== 'offline-parent') {
    try {
      // Get the stored configuration
      const result = await chrome.storage.local.get('menuConfig');
      const config = result.menuConfig;

      if (!config || !config.Offline) {
        console.error('Configuration not found');
        return;
      }

      // Determine selected part of DOM
      if (info.selectionText) {
        // User selected text
        console.log('Selected text:', info.selectionText);
      }
      if (info.srcUrl) {
        // User right-clicked on a media element
        console.log('Media URL:', info.srcUrl);
      }
      if (info.linkUrl) {
        // User right-clicked on a link
        console.log('Link URL:', info.linkUrl);
      }
      if (info.mediaType) {
        // Type of media (image, video, audio)
        console.log('Media type:', info.mediaType);
      }

      // Extract the index from the menu item ID
      const index = parseInt(info.menuItemId.replace('offline-', ''));
      const menuItem = config.Offline[index];

      if (!menuItem) {
        console.error('Menu item not found for index:', index);
        return;
      }

      // Send a message to the content script instead of injecting code
      chrome.tabs.sendMessage(tab.id, { action: 'perform_action', tag: menuItem.tag });

    } catch (error) {
      console.error('Error handling menu click:', error);
    }
  }
});

// Initialize context menus when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed/updated');
  setupContextMenus();
});


