import {
  ROUTE_TARGETS,
  MENU_NAME_KEY,
  CONTEXT_MENU_ID,
  ROUTE_MENU_ID_PREFIX,
  STORAGE_KEY_SUFFIX,
  MENU_ID_KEY,
} from '../consts.js';

let cachedConfigData = null;

/**
 * Fetches the configuration file from the extension's directory.
 * Caches the result to avoid multiple network requests.
 * @returns {Promise<Object>} The configuration data.
 */
export async function fetchConfigFile() {
  if (cachedConfigData !== null) {
    return cachedConfigData;
  }
  const configFileResponse = await fetch(chrome.runtime.getURL('config.json'));
  const configData = await configFileResponse.json();
  cachedConfigData = configData;
  return configData;
}

async function fetchMenuId() {
  const config = await fetchConfigFile();
  if (!config || !config.hasOwnProperty(MENU_ID_KEY)) {
    console.error('menu_id not found in config.json');
    return null;
  }
  return config[MENU_ID_KEY];
}

/**
 * Fetches the route targets from the configuration file.
 * @returns {Promise<Array>} The route targets.
 */
export async function fetchRouteTargets() {
  const config = await fetchConfigFile();
  if (!config || !config[ROUTE_TARGETS]) {
    console.warn('No configuration found for routing menus');
    return [];
  }

  if (!Array.isArray(config[ROUTE_TARGETS])) {
    console.error('Routing menu configuration is not an array');
    return [];
  }

  // Get the menu configuration
  const routingTargets = config[ROUTE_TARGETS];
  if (routingTargets.length === 0) {
    console.warn('No menu items found in config.json');
    return [];
  }
  return routingTargets;
}

/**
 * Fetches the menu name from the configuration file.

 * @returns {Promise<string|null>} The menu name.
 */

export async function fetchMenuLabel() {
  const config = await fetchConfigFile();
  if (!config || !config.hasOwnProperty(MENU_NAME_KEY)) {
    console.error('menu_label not found in config.json');
    return null;
  }
  return config[MENU_NAME_KEY];
}

export async function getBrowserStorageId() {
  const menuId = await fetchMenuId();
  if (!menuId) {
    console.error('Failed to get storage key for menu configuration');
    return null;
  }
  return `${menuId}_${STORAGE_KEY_SUFFIX}`;
}
