function setupHandler() {
  console.log('Extension installed/updated');
  setupContextMenus();
}

async function handleMenuClick(info, tab) {
  // Check if it's one of our menu items
  if (info.menuItemId.startsWith(ROUTE_MENU_ID_PREFIX) && info.menuItemId !== CONTEXT_MENU_ID) {
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
      chrome.tabs.sendMessage(tab.id, {
        action: 'perform_action',
        tag: menuItem.tag,
      });
    } catch (error) {
      console.error('Error handling menu click:', error);
    }
  }
}

export { setupHandler, handleMenuClick };
