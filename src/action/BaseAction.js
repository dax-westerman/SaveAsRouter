/**
 * Base action class for handling actions.
 */
export default class BaseAction {
  constructor(actionType) {
    this._actionType = actionType;
    // Configuration loading removed for browser compatibility
    this._config = {};
    this._actions = {};
    this._class_action_config = {};
    this._configLoadError = null;
  }

  logMethodCall(methodName, message) {
    const actionType = this.actionType;
    const actionRequested = message.action;
    const tag = message.tag;
    console.log(`[${actionType}] ${methodName} called with message: ${JSON.stringify(message)}`);
  }

  /**
   * Returns the action type.
   */
  get actionType() {
    return this._actionType;
  }

  /**
   * Execute all steps for the action.
   */
  async execute(message, sender, sendResponse) {
    await this.fetchContent(message, sender, sendResponse);
    await this.determineFileType(message, sender, sendResponse);
    await this.inferOrAskFilename(message, sender, sendResponse);
    await this.process(message, sender, sendResponse);
    await this.saveContent(message, sender, sendResponse);
  }

  // Handler methods to be implemented by subclasses

  async fetchContentHandler(message, sender, sendResponse) {
    throw new Error('Not Implemented');
  }

  async determineFileTypeHandler(message, sender, sendResponse) {
    throw new Error('Not Implemented');
  }

  async inferOrAskFilenameHandler(message, sender, sendResponse) {
    throw new Error('Not Implemented');
  }

  async processHandler(message, sender, sendResponse) {
    throw new Error('Not Implemented');
  }

  async saveContentHandler(message, sender, sendResponse) {
    throw new Error('Not Implemented');
  }

  // Public methods that call the handler methods

  async fetchContent(message, sender, sendResponse) {
    this.logMethodCall('fetchContentHandler', message, sender, sendResponse);
    return this.fetchContentHandler(message, sender, sendResponse);
  }
  async determineFileType(message, sender, sendResponse) {
    this.logMethodCall('determineFileTypeHandler', message, sender, sendResponse);
    return this.determineFileTypeHandler(message, sender, sendResponse);
  }

  async inferOrAskFilename(message, sender, sendResponse) {
    this.logMethodCall('inferOrAskFilenameHandler', message, sender, sendResponse);
    return this.inferOrAskFilenameHandler(message, sender, sendResponse);
  }

  async process(message, sender, sendResponse) {
    this.logMethodCall('processHandler', message, sender, sendResponse);
    return this.processHandler(message, sender, sendResponse);
  }

  async saveContent(message, sender, sendResponse) {
    this.logMethodCall('saveContentHandler', message, sender, sendResponse);
    return this.saveContentHandler(message, sender, sendResponse);
  }
}
