// Background service worker for SaveAsRouter Chrome Extension
import { handleMenuClick } from './handlers.js';
import { setupHandler } from './handlers/setup.js';
// Content script for SaveAsRouter Chrome Extension
import { actionHandler } from './action/ActionHandler.js';

// Initialize context menus when extension is installed or updated
chrome.runtime.onInstalled.addListener(setupHandler);

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(handleMenuClick);

chrome.runtime.onMessage.addListener(actionListener);
