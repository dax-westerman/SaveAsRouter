const BaseAction = require('../action_base');

class Infographic extends BaseAction {
    constructor() {
        super('infographic');
    }

    // You can override or add methods here
    execute(req, res) {
        // Custom implementation for Infographic action
        super.execute(req, res);
    }
}

module.exports = Infographic;