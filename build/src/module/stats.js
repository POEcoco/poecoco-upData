"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckLength = void 0;
const content_1 = require("../content");
const fs_1 = require("fs");
const list = (0, content_1.GetLanguageKeys)();
async function CheckLength() {
    let result = true;
    //Check Length   (panic)
    const collection = [];
    for (const lang of list) {
        const str = await (0, fs_1.readFileSync)('./output/fetch/' + `${lang}_static.json`, 'utf8');
        const typeJSON = JSON.parse(str)['result'];
        collection.push(typeJSON);
    }
    const length = [];
    for (const JSONs of collection) {
        const enet = [];
        for (const ii of JSONs) {
            enet.push(ii['entries'].length);
        }
        length.push(enet);
    }
    for (const i in collection) {
        for (let ii = 0; ii < collection[i].length; ii++) {
            const answer = length[i][ii];
            if (answer !== collection[i][ii]['entries'].length) {
                result = false;
            }
        }
    }
    return result;
}
exports.CheckLength = CheckLength;
//# sourceMappingURL=stats.js.map