import { CONTEXT_MENU_ID, ROUTE_MENU_ID_PREFIX } from './consts.js';
import {
  fetchConfigFile,
  fetchRouteTargets,
  fetchMenuLabel,
  getBrowserStorageId,
} from './config_mgr.js';

// Load configuration and create context menus
export async function setupContextMenus() {
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
    contexts: ['all'], // Show for all contexts (text, links, images, videos, etc.)
  });

  // Create sub-menu items
  route_targets.forEach((menuItem, index) => {
    chrome.contextMenus.create({
      id: `${ROUTE_MENU_ID_PREFIX}${index}`,
      parentId: CONTEXT_MENU_ID,
      title: menuItem.label,
      contexts: ['all'],
    });
  });

  // Store config in chrome storage for later access
  const storageKey = await getBrowserStorageId();
  if (storageKey) {
    await chrome.storage.local.set({ storageKey: config });
  }

  console.log('Context menus created successfully');
}
