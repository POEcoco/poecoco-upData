"use strict";
/*
  There are two exec cmd here:
  1. for @actions/exec
  2. default cmd for pipe operate (cause @actions/exec doesn't support pipe operated)
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutePipe = exports.Execute = void 0;
const exe = require("@actions/exec");
async function Execute(prop, args) {
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
    let str = prop;
    if (args !== undefined) {
        for (const key of args) {
            str += ' ' + key;
        }
    }
    await exe.exec(str, undefined, options);
    return [myOutput, myError];
}
exports.Execute = Execute;
const exec = require("child_process");
async function ExecutePipe(prop, args) {
    let str = prop;
    if (args !== undefined) {
        for (const key of args) {
            str += ' ' + key;
        }
    }
    return new Promise((resolve, reject) => {
        exec.exec(str, successResponse => resolve(successResponse));
    });
}
exports.ExecutePipe = ExecutePipe;
//# sourceMappingURL=cli.js.map