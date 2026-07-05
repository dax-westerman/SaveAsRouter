// Background service worker for SaveAsRouter Chrome Extension
import { menuListener } from './handlers/menu.js';
import { setupContentRouter } from './handlers/setup.js';

// Initialize context menus when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed or updated. Setting up context menus...');
  setupContentRouter();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log('Context menu item clicked:', info.menuItemId);
  menuListener();
});
