import { setupContextMenus } from './menu_setup.js';

/**
 * Sets up the extension's context menu and handles installation or update events.
 * This function is called when the extension is installed or updated.
 * It fetches the configuration, creates context menus, and stores the configuration in Chrome storage.
 */
function setupHandler() {
  try {
    setupContextMenus();
    console.log(`Successfully set up context menus with permanent id: ${PERMANENT_PROJECT_LABEL}`);
  } catch (error) {
    console.error(
      `Error setting up context menus with permanent id ${PERMANENT_PROJECT_LABEL}`,
      error
    );
  }
}

export { setupHandler };
