// Background service worker for SaveAsRouter Chrome Extension
import { setupHandler as menuSetup, handleMenuClick } from './handlers.js';

// Initialize context menus when extension is installed or updated
chrome.runtime.onInstalled.addListener(menuSetup);

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(handleMenuClick);
