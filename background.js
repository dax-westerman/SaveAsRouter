// Background service worker for SaveAsRouter Chrome Extension

import {
  ROUTE_TARGETS,
  MENU_NAME_KEY,
  CONTEXT_MENU_ID,
  ROUTE_MENU_ID_PREFIX,
} from "./consts.js";
import { fetchConfigFile } from "./config_mgr.js";

import { setupHandler, handleMenuClick } from "./handlers.js";

export let cachedConfigData = null;

/**
 * Fetches the route targets from the configuration file.
 * @param {*} config The configuration data.
 * @returns {Promise<Array>} The route targets.
 */
async function fetchRouteTargets(config) {
  if (!config || !config[ROUTE_TARGETS]) {
    console.warn("No configuration found for routing menus");
    return [];
  }

  if (!Array.isArray(config[ROUTE_TARGETS])) {
    console.error("Routing menu configuration is not an array");
    return [];
  }

  // Get the menu configuration
  const routingTargets = config[ROUTE_TARGETS];
  if (routingTargets.length === 0) {
    console.warn("No menu items found in config.json");
    return [];
  }
  return routingTargets;
}

/**
 * Fetches the menu name from the configuration file.
 * @param {*} config The configuration data.
 * @returns {Promise<string|null>} The menu name.
 */

async function fetchMenuLabel(config) {
  if (!config || !config.hasOwnProperty(MENU_NAME_KEY)) {
    console.error("menu_label not found in config.json");
    return null;
  }
  return config[MENU_NAME_KEY];
}

// Load configuration and create context menus
async function setupContextMenus() {
  try {
    // Fetch the configuration
    const config = await fetchConfigFile();

    // Get the menu configuration
    const route_targets = await fetchRouteTargets(config);

    // Get the menu name from config
    const menuName = await fetchMenuLabel(config);

    // Remove existing menus
    await chrome.contextMenus.removeAll();

    // Create parent menu item
    chrome.contextMenus.create({
      id: CONTEXT_MENU_ID,
      title: menuName,
      contexts: ["all"], // Show for all contexts (text, links, images, videos, etc.)
    });

    // Create sub-menu items
    route_targets.forEach((menuItem, index) => {
      chrome.contextMenus.create({
        id: `${ROUTE_MENU_ID_PREFIX}${index}`,
        parentId: CONTEXT_MENU_ID,
        title: menuItem.label,
        contexts: ["all"],
      });
    });

    // Store config in chrome storage for later access
    await chrome.storage.local.set({ menuConfig: config });

    console.log("Context menus created successfully");
  } catch (error) {
    console.error("Error setting up context menus:", error);
  }
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(handleMenuClick);

// Initialize context menus when extension is installed or updated
chrome.runtime.onInstalled.addListener(setupHandler);
