"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAllDataFromOffical = void 0;
const content_1 = require("../content");
const items_1 = require("./items");
const stats_1 = require("./stats");
/**從網路獲取所有要處理的JSON */
async function FetchAllDataFromOffical() {
    const list = (0, content_1.GetLanguageKeys)();
    for (const lang of list) {
        const entity = await (0, items_1.FetchNewItemJson)(lang);
        await (0, items_1.WriteItemJsonToLocal)(lang, entity);
    }
    for (const lang of list) {
        const entity = await (0, stats_1.FetchNewStatsJson)(lang);
        await (0, stats_1.WriteStatsJsonToLocal)(lang, entity);
    }
    console.log('Get All File From Offical Website');
}
exports.FetchAllDataFromOffical = FetchAllDataFromOffical;
//# sourceMappingURL=fetchdata.js.map