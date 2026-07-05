import { MESSAGE_ACTION_KEY } from '../consts.js';

const actionInstanceCache = {};

async function fetchActionHandler(action) {
  console.log('Processing action:', action);

  let instance;

  try {
    // Check if the action is already defined in the cache
    const actionDefined = action in actionInstanceCache;
    if (actionDefined) {
      instance = actionInstanceCache[action];
      console.log(`Using cached action for action: ${action}`);
    } else {
      console.log(
        `Dynamically loading action module for action: ${action} from ./action/${action}/action.js`
      );
      const module = await import(/* webpackIgnore: true */ `./action/${action}/action.js`);
      const ActionClass = module.default;
      instance = new ActionClass();
      actionInstanceCache[action] = instance;
      console.log(`Creating new instance for: ${action}`);
    }

    console.log(`Loaded action for action: ${instance.actionType}`);
    return actionInstanceCache[action];
  } catch (error) {
    console.error(`Error loading action for action: ${action}`, error);
    return null;
  }
}

async function actionListener(message, sender, sendResponse) {
  if (message.action === MESSAGE_ACTION_KEY && message.tag) {
    const action = message.tag;
    const actionHandler = await fetchActionHandler(action);
    if (actionHandler) {
      console.log(`Executing action handler for action: ${action}`);
      await actionHandler.execute(message, sender, sendResponse);
    } else {
      console.error(`No action handler found for action: ${action}`);
    }
  } else {
    console.warn('Received unknown message:', message);
  }
}

export { actionListener };
