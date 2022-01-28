"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchdata_1 = require("./module/fetchdata");
const items_1 = require("./module/items");
const FetchNewData = false;
async function main() {
    //Get all source data
    if (FetchNewData) {
        await (0, fetchdata_1.FetchAllDataFromOffical)();
    }
    //Check file has been edit or not
    await (0, items_1.GenerateBlackList)();
}
main();
//# sourceMappingURL=index.js.map