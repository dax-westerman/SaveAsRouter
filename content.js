// Content script for SaveAsRouter Chrome Extension
import { handleTag } from './action/action_loader.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'perform_action' && message.tag) {
        console.log('Content script received tag:', message.tag);
        handleTag(message.tag);
    }
});
