"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const content_1 = require("./content");
const targetPath = './output/old/';
const list = (0, content_1.GetLanguageKeys)();
async function main() {
    //Get all source data
    //await GetAllNewData();
    //Check file has been edit or not
    //基準檔案
    const standJSON = JSON.parse((0, fs_1.readFileSync)(targetPath + 'GB_item.json', 'utf8'))['result'];
    let dateList = await updateDateModified();
    let broken = false; //截斷
    let modified = false; //新更改
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (broken) {
            broken = !broken;
            continue;
        }
        //檢查是否有新的更改
        modified = false;
        for (const i in list) {
            const stat = await (0, fs_1.statSync)(targetPath + `${list[i]}_item.json`);
            if (stat.mtime.getTime() !== dateList[i].getTime()) {
                modified = true;
            }
        }
        if (modified) {
            for (const i in list) {
                const str = await (0, fs_1.readFileSync)(targetPath + `${list[i]}_item.json`, 'utf8');
                let compareJSON = {};
                try {
                    compareJSON = JSON.parse(str)['result'];
                }
                catch (_a) {
                    continue;
                }
                for (const ii in compareJSON) {
                    if (compareJSON[ii]['entries'].length !==
                        standJSON[ii]['entries'].length) {
                        console.log(list[i] +
                            '-' +
                            compareJSON[ii]['entries'].length +
                            ':' +
                            standJSON[ii]['entries'].length +
                            `-GB  in ${standJSON[ii]['label']}`);
                        modified = !modified;
                        dateList = await updateDateModified();
                        broken = true;
                        break;
                    }
                }
                if (broken) {
                    broken = !broken;
                    break;
                }
            }
        }
    }
}
main();
async function updateDateModified() {
    const dateList = [];
    for (const lang of list) {
        const stat = await (0, fs_1.statSync)(targetPath + `${lang}_item.json`);
        dateList.push(stat.mtime);
    }
    return dateList;
}
//# sourceMappingURL=index.js.map