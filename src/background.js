// Background service worker for SaveAsRouter Chrome Extension
import { menuListener } from './handlers/menu.js';
import { setupHandler } from './handlers/setup.js';


// Initialize context menus when extension is installed or updated
chrome.runtime.onInstalled.addListener(setupHandler);

chrome.contextMenus.onClicked.addListener(menuListener);
