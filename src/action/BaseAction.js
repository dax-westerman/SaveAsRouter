/**
 * Base action class for handling actions.
 */
export class BaseAction {
  constructor(actionType) {
    this._actionType = actionType;
    // Configuration loading removed for browser compatibility
    this._config = {};
    this._actions = {};
    this._class_action_config = {};
    this._configLoadError = null;
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
  async execute(req, res) {
    await this.fetch_content();
    await this.determine_file_type();
    await this.infer_or_ask_filename();
    await this.process();
    await this.save_content();
  }

  async fetch_content() {
    throw new Error('You must implement requiredMethod() in a derived class');
  }

  async determine_file_type() {
    throw new Error('You must implement requiredMethod() in a derived class');
  }

  async infer_or_ask_filename() {
    throw new Error('You must implement requiredMethod() in a derived class');
  }

  async process() {
    throw new Error('You must implement requiredMethod() in a derived class');
  }

  async save_content() {
    throw new Error('You must implement requiredMethod() in a derived class');
  }
}
