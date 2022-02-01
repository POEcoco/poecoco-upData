"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratedNewData = exports.FetchNewSkillTree = exports.WriteSkillTreeJsonToLocal = exports.LoadLocalSkillTreeJson = void 0;
const fs_1 = require("fs");
const cli_1 = require("../utility/cli");
const PASSIVETREEPATH = 'https://www.pathofexile.com/passive-skill-tree'; //TO GET PASSIVETREE
const ActivePath = './output/skilltree/';
/**
 * 讀取本地的技能樹JSON
 *  @returns JSON
 **/
async function LoadLocalSkillTreeJson() {
    let result = {};
    const str = await (0, fs_1.readFileSync)(ActivePath + 'skillTree.json', 'utf8');
    result = JSON.parse(str);
    return result;
}
exports.LoadLocalSkillTreeJson = LoadLocalSkillTreeJson;
/**
 * 寫入本地的物品JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
async function WriteSkillTreeJsonToLocal(data) {
    await (0, fs_1.writeFileSync)(ActivePath + 'skillTree.json', JSON.stringify(data, null, 4));
}
exports.WriteSkillTreeJsonToLocal = WriteSkillTreeJsonToLocal;
/**
 * 從網路獲取新的技能樹JSON
 * @returns JSON
 */
async function FetchNewSkillTree() {
    let result = {};
    //獲取位置
    const host = PASSIVETREEPATH;
    //HTML本體
    const [out] = await (0, cli_1.default)('curl', [host]);
    //關鍵字位置
    const key = 'var passiveSkillTreeData = {';
    const pos = out.indexOf(key);
    const limit = out.length;
    //調整開始位置
    let data = '{';
    let counter = pos + key.length;
    let lefS = 1;
    //爬找生成JSON
    while (counter < limit) {
        if (lefS === 0) {
            break;
        }
        if (out[counter] === '{') {
            lefS++;
        }
        else if (out[counter] === '}') {
            lefS--;
        }
        data += out[counter];
        counter++;
    }
    try {
        result = JSON.parse(data);
    }
    catch (err) {
        throw new Error('技能樹更新失敗');
    }
    console.log('技能樹更新完成');
    return result;
}
exports.FetchNewSkillTree = FetchNewSkillTree;
async function GeneratedNewData() {
    //生成結構資料以供POEcoco使用
    /** @TODO: 生成圖形的結構資料以供POEcoco使用 */
}
exports.GeneratedNewData = GeneratedNewData;
//# sourceMappingURL=skillTree.js.map