import BaseAction from '../BaseAction.js';

class Infographic extends BaseAction {
  constructor() {
    super('infographic');
  }

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
}

export default Infographic;
