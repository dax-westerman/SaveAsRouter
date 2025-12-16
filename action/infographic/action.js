import { BaseAction } from '../action_base.js';

class Infographic extends BaseAction {
    constructor() {
        super('infographic');
    }

    // You can override or add methods here
    execute(req, res) {
        // Custom implementation for Infographic action
        super.execute(req, res);
    }

    async fetch_content() {
        throw new Error('implement fetch_content()');
    }

    async determine_file_type() {
        throw new Error('implement determine_file_type()');
    }

    async infer_or_ask_filename() {
        throw new Error('implement infer_or_ask_filename()');
    }

    async process() {
        throw new Error('implement process()');
    }

    async save_content() {
        throw new Error('implement save_content()');
    }
}

export default Infographic;