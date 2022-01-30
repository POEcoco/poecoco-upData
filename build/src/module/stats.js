"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratedNewData = exports.FetchNewStatsJson = exports.LoadAllLocalStatsJson = exports.LoadLocalStatsJson = exports.WriteStatsJsonToLocal = void 0;
const content_1 = require("../content");
const fs_1 = require("fs");
const cli_1 = require("../utility/cli");
const FetchPath = './output/fetch/';
const LocalPath = './output/stats/';
/**
 * 是否在陣列中包含
 * @param text 輸入完整名稱
 * @param entries 要搜尋的陣列
 * @returns 布林值
 */
/*function isContain(text: string, entries: any[]): boolean {
  let result = false;
  for (const entry of entries) {
    if (entry['text'] === text) {
      result = true;
      break;
    }
  }
  return result;
}*/
/**
 * 寫入本地的詞綴JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
async function WriteStatsJsonToLocal(lang, data) {
    await fs_1.writeFileSync(LocalPath + `${lang}_stats.json`, JSON.stringify(data, null, 4));
}
exports.WriteStatsJsonToLocal = WriteStatsJsonToLocal;
/**
 * 讀取本地的詞綴JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
async function LoadLocalStatsJson(lang) {
    let result = {};
    const str = await fs_1.readFileSync(FetchPath + `${lang}_stats.json`, 'utf8');
    result = JSON.parse(str);
    return result;
}
exports.LoadLocalStatsJson = LoadLocalStatsJson;
/**
 * 讀取本地的物品JSON集合
 *  @returns JSON{
 *  GB:{"result":{}},
 *  TW:{"result":{}},
 *  CN:{"result":{}},
 *  KR:{"result":{}},.....
 * }
 **/
async function LoadAllLocalStatsJson() {
    const collection = {};
    const list = content_1.GetLanguageKeys();
    for (const lang of list) {
        const str = await fs_1.readFileSync(FetchPath + `${lang}_stats.json`, 'utf8');
        const rawJSON = JSON.parse(str);
        collection[lang] = rawJSON;
    }
    return collection;
}
exports.LoadAllLocalStatsJson = LoadAllLocalStatsJson;
/**
 * 從官網拉取JSON
 *  @returns JSON{
 *  result:[],
 * }
 **/
async function FetchNewStatsJson(lang) {
    let result = {};
    const host = content_1.GetStatsURL(lang);
    const [out] = await cli_1.default('curl', [host]);
    result = JSON.parse(out);
    return result;
}
exports.FetchNewStatsJson = FetchNewStatsJson;
function GeneratedNewData() {
    throw new Error('Function not implemented.');
}
exports.GeneratedNewData = GeneratedNewData;
//# sourceMappingURL=stats.js.map