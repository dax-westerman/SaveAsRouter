import BaseAction from '../BaseAction.js';

class Video extends BaseAction {
  constructor() {
    super('video');
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

export default Video;
