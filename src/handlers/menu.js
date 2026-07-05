import { CONTEXT_MENU_ID, ROUTE_MENU_ID_PREFIX, MESSAGE_ACTION_KEY } from '../consts.js';
import { fetchRouteTargets } from '../config/config_mgr.js';

/**
 * Handles clicks on the extension's context menu items.
 * This function is called when a context menu item is clicked.
 * It retrieves the stored configuration and performs the appropriate action based on the clicked menu item.
 * @param {*} info - Information about the clicked menu item.
 * @param {*} tab - The tab where the click occurred.
 * @returns {Promise<void>}
 */
async function menuListener(info, tab) {
  console.log('Menu item clicked:', info.menuItemId);
  // Check if it's one of our menu items
  if (info.menuItemId.startsWith(ROUTE_MENU_ID_PREFIX) && info.menuItemId !== CONTEXT_MENU_ID) {
    try {
      const route_targets = await fetchRouteTargets();

      // Extract the index from the menu item ID
      const index = parseInt(info.menuItemId.replace(ROUTE_MENU_ID_PREFIX, ''));
      const menuItem = route_targets[index];

      if (!menuItem) {
        console.error('Menu item not found for index:', index);
        return;
      }

      // Determine selected part of DOM
      if (info.selectionText) {
        console.log('Selected text:', info.selectionText);
      }
      if (info.srcUrl) {
        console.log('Media URL:', info.srcUrl);
      }
      if (info.linkUrl) {
        console.log('Link URL:', info.linkUrl);
      }
      if (info.mediaType) {
        console.log('Media type:', info.mediaType);
      }

      // Send a message to the content script
      chrome.tabs.sendMessage(tab.id, {
        action: MESSAGE_ACTION_KEY,
        tag: menuItem.tag,
      });

      TODO - how to pick up the context of the click - selected text, link, media, etc. and pass it to the content script for processing
    } catch (error) {
      console.error('Error handling menu click:', error);
    }
  }
}

export { menuListener };
