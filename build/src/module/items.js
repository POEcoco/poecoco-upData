"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllLocalItemJson = exports.WriteItemJsonToLocal = exports.GetLocalItemJson = exports.GenerateBlackList = void 0;
const content_1 = require("../content");
const fs_1 = require("fs");
const ActivePath = './output/items/';
const list = (0, content_1.GetLanguageKeys)();
async function GenerateBlackList() {
    //更新網路新資料
    //await FetchAllDataFromOffical();
    const Rawcollection = {};
    for (const lang of list) {
        const str = await (0, fs_1.readFileSync)('./output/fetch/' + `${lang}_item.json`, 'utf8');
        const rawJSON = JSON.parse(str);
        Rawcollection[lang] = rawJSON;
    }
    //獲取本地原始檔案
    const collection = await GetAllLocalItemJson();
    //篩選黑名單
    for (const lang of list) {
        //剔除已經具有的項目
        const keyJSON = collection[lang];
        const newJSON = Rawcollection[lang];
        const resultJSON = {
            result: [],
        };
        for (const i in keyJSON['result']) {
            if (keyJSON['result'][i]['id'] !== newJSON['result'][i]['id']) {
                throw new Error(`錯誤:項目"${keyJSON['result'][i]['id']}"無法對上`);
            }
            let enty = {};
            enty = JSON.stringify(keyJSON['result'][i]);
            enty = JSON.parse(enty);
            enty['entries'] = [];
            //開始剔除
            for (const key of newJSON['result'][i]['entries']) {
                //檢查是不是已有的資料
                const checktxt = key['text'];
                if (!isContain(checktxt, keyJSON['result'][i]['entries'])) {
                    enty['entries'].push(key);
                }
            }
            resultJSON['result'].push(enty);
        }
        //更新檔案
        await (0, fs_1.writeFileSync)(`./output/blacklist/${lang}_items.blacklist.json`, JSON.stringify(resultJSON, null, 4));
    }
    console.log('結束完成黑名單生成');
}
exports.GenerateBlackList = GenerateBlackList;
function isContain(text, entries) {
    let result = false;
    for (const entry of entries) {
        if (entry['text'] === text) {
            result = true;
            break;
        }
    }
    return result;
}
/**
 * 獲取本地的物品JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
async function GetLocalItemJson(lang) {
    let result = {};
    const str = await (0, fs_1.readFileSync)(ActivePath + `${lang}_item.json`, 'utf8');
    result = JSON.parse(str);
    return result;
}
exports.GetLocalItemJson = GetLocalItemJson;
/**
 * 寫入本地的物品JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
async function WriteItemJsonToLocal(lang, data) {
    await (0, fs_1.writeFileSync)(ActivePath + `${lang}_item.json`, JSON.stringify(data, null, 4));
}
exports.WriteItemJsonToLocal = WriteItemJsonToLocal;
/**
 * 獲取本地的物品JSON集合
 *  @returns JSON{
 *  GB:{},
 *  TW:{},
 *  CN:{},
 *  KR:{},.....
 * }
 **/
//獲取本地的物品JSON集合
async function GetAllLocalItemJson() {
    const collection = {};
    for (const lang of list) {
        const str = await (0, fs_1.readFileSync)(ActivePath + `${lang}_item.json`, 'utf8');
        const rawJSON = JSON.parse(str);
        collection[lang] = rawJSON;
    }
    return collection;
}
exports.GetAllLocalItemJson = GetAllLocalItemJson;
//# sourceMappingURL=items.js.map