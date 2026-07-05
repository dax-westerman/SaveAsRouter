import { actionListener } from './handlers/actions.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background listener script received message:', message);
  actionListener(message, sender, sendResponse);
});
