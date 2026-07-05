import { cachedConfigData } from "./background";

/**
 * Fetches the configuration file from the extension's directory.
 * Caches the result to avoid multiple network requests.
 * @returns {Promise<Object>} The configuration data.
 */
export async function fetchConfigFile() {
  if (cachedConfigData !== null) {
    return cachedConfigData;
  }
  const configFileResponse = await fetch(chrome.runtime.getURL("config.json"));
  const configData = await configFileResponse.json();
  cachedConfigData = configData;
  return configData;
}async function fetchMenuId(config) {
  if (!config || !config.hasOwnProperty(MENU_ID_KEY)) {
    console.error("menu_id not found in config.json");
    return null;
  }
  return config[MENU_ID_KEY];
}

