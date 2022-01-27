"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const content_1 = require("./content");
const module_1 = require("./module/module");
const targetPath = './output/old/';
const list = (0, content_1.GetLanguageKeys)();
const earlyget = false;
async function main() {
    //Get all source data
    if (earlyget)
        await (0, module_1.GetAllNewData)();
    //Check file has been edit or not
    //基準檔案
    let standJSON = JSON.parse((0, fs_1.readFileSync)(targetPath + 'GB_item.json', 'utf8'))['result'];
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
            try {
                //reload
                standJSON = JSON.parse((0, fs_1.readFileSync)(targetPath + 'GB_item.json', 'utf8'))['result'];
                //基準檔案全體重新編號
                for (const ii in standJSON) {
                    let index = 1;
                    for (const iii of standJSON[ii]['entries']) {
                        iii['index'] = index++;
                    }
                }
                await (0, fs_1.writeFileSync)(targetPath + 'GB_item.json', JSON.stringify({
                    result: standJSON,
                }, null, 4));
                //reload
                standJSON = JSON.parse((0, fs_1.readFileSync)(targetPath + 'GB_item.json', 'utf8'))['result'];
            }
            catch (_a) {
                continue;
            }
            //比較的檔案重新編號
            for (const i in list) {
                const str = await (0, fs_1.readFileSync)(targetPath + `${list[i]}_item.json`, 'utf8');
                let compareJSON = {};
                try {
                    compareJSON = JSON.parse(str)['result'];
                }
                catch (_b) {
                    continue;
                }
                for (const ii in compareJSON) {
                    let index = 1;
                    for (const iii of compareJSON[ii]['entries']) {
                        iii['index'] = index++;
                    }
                    await (0, fs_1.writeFileSync)(targetPath + `${list[i]}_item.json`, JSON.stringify({
                        result: compareJSON,
                    }, null, 4));
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