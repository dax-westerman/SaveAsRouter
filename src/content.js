import { actionListener } from './handlers/actions.js';

chrome.runtime.onMessage.addListener(actionListener);
