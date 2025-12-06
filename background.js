// Load config and create context menus
let config = {};

// Load config file
fetch(chrome.runtime.getURL('config.json'))
  .then(response => response.json())
  .then(data => {
    config = data;
    createContextMenus();
  })
  .catch(error => console.error('Error loading config:', error));

// Create context menus from config
function createContextMenus() {
  // Remove all existing menus first
  chrome.contextMenus.removeAll(() => {
    if (config.Offline && Array.isArray(config.Offline)) {
      // Create parent menu
      chrome.contextMenus.create({
        id: 'offline-parent',
        title: 'Offline',
        contexts: ['all']
      });

      // Create sub-menus from config
      config.Offline.forEach((item, index) => {
        chrome.contextMenus.create({
          id: `offline-${item.tag}`,
          parentId: 'offline-parent',
          title: item.label,
          contexts: ['all']
        });
      });
    }
  });
}

// Handle menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith('offline-')) {
    // Extract tag from menu item id
    const tag = info.menuItemId.replace('offline-', '');
    
    // Inject and execute perform_action function in the active tab
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: performAction,
      args: [tag]
    });
  }
});

// The perform_action function that will be injected into the page
function performAction(tag) {
  alert(tag);
}
