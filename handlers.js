/**
 * Sets up the extension's context menu and handles installation or update events.
 * This function is called when the extension is installed or updated.
 * It fetches the configuration, creates context menus, and stores the configuration in Chrome storage.
 */
function setupHandler() {
  console.log('Extension installed/updated');
  setupContextMenus();
}

/**
 * Handles clicks on the extension's context menu items.
 * This function is called when a context menu item is clicked.
 * It retrieves the stored configuration and performs the appropriate action based on the clicked menu item.
 * @param {*} info - Information about the clicked menu item.
 * @param {*} tab - The tab where the click occurred.
 * @returns {Promise<void>}
 */
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
