"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./module/module");
const core = require("@actions/core");
async function main() {
    try {
        //主要流程
        await (0, module_1.DefaultProcess)();
    }
    catch (err) {
        //Failed the process;
        const msg = JSON.stringify(err.message);
        core.setFailed(msg);
    }
    core.info(`所有流程更新完成!! ${new Date().toString()}`);
}
main();
//# sourceMappingURL=index.js.map