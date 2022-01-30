"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratedNewData = exports.FetchNewItemJson = exports.LoadAllLocalItemJson = exports.LoadLocalItemJson = exports.WriteItemJsonToLocal = void 0;
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
 * 寫入本地的物品JSON
 *  @param lang Language KEY
 *  @param data content
 *  @returns JSON
 **/
async function WriteItemJsonToLocal(lang, data) {
    await fs_1.writeFileSync(LocalPath + `${lang}_item.json`, JSON.stringify(data, null, 4));
}
exports.WriteItemJsonToLocal = WriteItemJsonToLocal;
/**
 * 讀取新獲取的本地物品JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
async function LoadLocalItemJson(lang) {
    let result = {};
    const str = await fs_1.readFileSync(FetchPath + `${lang}_item.json`, 'utf8');
    result = JSON.parse(str);
    return result;
}
exports.LoadLocalItemJson = LoadLocalItemJson;
/**
 * 讀取新獲取的本地物品JSON集合
 *  @returns JSON{
 *  GB:{"result":{}},
 *  TW:{"result":{}},
 *  CN:{"result":{}},
 *  KR:{"result":{}},.....
 * }
 **/
async function LoadAllLocalItemJson(input_p) {
    const list = content_1.GetLanguageKeys();
    const collection = {};
    for (const lang of list) {
        const str = await fs_1.readFileSync(input_p + `${lang}_item.json`, 'utf8');
        const rawJSON = JSON.parse(str);
        collection[lang] = rawJSON;
    }
    return collection;
}
exports.LoadAllLocalItemJson = LoadAllLocalItemJson;
/**
 * 從官網拉取JSON
 *  @returns JSON{
 *  result:[],
 * }
 **/
async function FetchNewItemJson(lang) {
    let result = {};
    const host = content_1.GetItemsURL(lang);
    const [out] = await cli_1.default('curl', [host]);
    result = JSON.parse(out);
    return result;
}
exports.FetchNewItemJson = FetchNewItemJson;
async function GeneratedNewData() {
    const newcollection = await LoadAllLocalItemJson('./output/fetch');
    const oldcollection = await LoadAllLocalItemJson('./output/items');
    const blackCollection = await LoadAllLocalItemJson('./output/blacklist');
}
exports.GeneratedNewData = GeneratedNewData;
//# sourceMappingURL=items.js.map