// Content script for SaveAsRouter Chrome Extension
import { handleTag } from './action/ActionLoader.js';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'perform_action' && message.tag) {
        console.log('Content script received tag:', message.tag);
        handleTag(message.tag);
    }
});
