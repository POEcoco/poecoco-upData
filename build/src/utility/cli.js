"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exec = require('@actions/exec');
async function execute(prop, args) {
    let myOutput = '';
    let myError = '';
    const options = {};
    options.listeners = {
        stdout: (data) => {
            myOutput += data.toString();
        },
        stderr: (data) => {
            myError += data.toString();
        },
    };
    await exec.exec(prop, args, options);
    return [myOutput, myError];
}
exports.default = execute;
//# sourceMappingURL=cli.js.map