const path = require('path');


/**
 * Base action class for handling actions.
 */
class BaseAction {
  constructor(actionType) {
    this._actionType = actionType;
    try {
      const configPath = path.join(process.cwd(), 'config.json');
      this._config = require(configPath);
      if (!this._config || !this._config.Actions) {
        throw new Error("Invalid or missing Actions configuration");
      }
      
      actions = this._config.Actions;

      const PRESTEPS = "pre_steps";
      const POSTSTEPS = "post_steps";
      const CLASS_ACTIONS = "class_actions";

      if (!(PRESTEPS in actions)) {
        throw new KeyError("pre_steps section missing in Actions config");
      }
      if (!(POSTSTEPS in actions)) {
        throw new KeyError("post_steps section missing in Actions config");
      }
      if (!(CLASS_ACTIONS in actions)) {
        throw new KeyError("class_actions section missing in Actions config");
      }
      if (!(this._actionType in actions.class_actions)) {
        throw new KeyError(`Action type ${this._actionType} missing in class_actions config`);
      }
      this._class_action_config = actions.class_actions[this._actionType];

      this._file = this._class_action_config.file;
      this._pre_steps = actions.pre_steps;
      this._processing_steps = actions.processing_steps || this._class_action_config.steps;
      this._post_steps = actions.post_steps;

    } catch (err) {
      this._config = {};
      this._actions = {};
      this._class_action_config = {};
      this._configLoadError = err;
    }
  }

  /**
   * Execute the action.
   */
  execute(req, res) {
    // Implementation for executing the action
  }
}



module.exports = BaseAction;