// Background service worker for SaveAsRouter Chrome Extension
import { ROUTE_TARGETS, MENU_NAME_KEY, CONTEXT_MENU_ID, ROUTE_MENU_ID_PREFIX } from './consts.js';
import { fetchConfigFile, fetchRouteTargets, fetchMenuLabel } from './config_mgr.js';
import { setupHandler, handleMenuClick } from './handlers.js';

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(handleMenuClick);

// Initialize context menus when extension is installed or updated
chrome.runtime.onInstalled.addListener(setupHandler);
