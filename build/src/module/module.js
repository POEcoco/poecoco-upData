"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAllDataFromOffical = exports.DefaultProcess = void 0;
const content_1 = require("../content");
const items = require("./items");
const skillTree = require("./skillTree");
const stats = require("./stats");
/**基礎的流程(拉取新資料 → 比對翻譯資料 → 寫入output以供poecoco使用) */
async function DefaultProcess() {
    //拉取新資料
    await FetchAllDataFromOffical();
    //生成新資料
    await items.GeneratedNewData();
    await stats.GeneratedNewData();
    await skillTree.GeneratedNewData();
}
exports.DefaultProcess = DefaultProcess;
/**從網路獲取所有要處理的JSON */
async function FetchAllDataFromOffical() {
    //獲取語言列表
    const list = content_1.GetLanguageKeys();
    //更新每個物品JSON
    for (const lang of list) {
        const entity = await items.FetchNewItemJson(lang);
        await items.WriteItemJsonToLocal(lang, entity);
    }
    //更新每個詞綴JSON
    for (const lang of list) {
        const entity = await stats.FetchNewStatsJson(lang);
        await stats.WriteStatsJsonToLocal(lang, entity);
    }
    //更新技能樹JSON
    const skTree = await skillTree.FetchNewSkillTree();
    await skillTree.WriteSkillTreeJsonToLocal(skTree);
    console.log('Fetch All new Files From Offical Website');
}
exports.FetchAllDataFromOffical = FetchAllDataFromOffical;
//# sourceMappingURL=module.js.map