"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAllDataFromOffical = void 0;
const fs_1 = require("fs");
const cli_1 = require("../utility/cli");
const content_1 = require("../content");
const targetPath = './output/fetch/';
async function FetchAllDataFromOffical() {
    const list = (0, content_1.GetLanguageKeys)();
    for (const lang of list) {
        const host = (0, content_1.GetItemsURL)(lang);
        const [out, err] = await (0, cli_1.default)('curl', [host]);
        const entity = JSON.parse(out);
        if (Object.prototype.hasOwnProperty.call(entity, 'error')) {
            continue;
        }
        for (const ent of entity['result']) {
            let index = 1;
            const newentry = [];
            for (const entry in ent['entries']) {
                if (!Object.prototype.hasOwnProperty.call(ent['entries'][entry], 'flags')) {
                    continue;
                }
                const entt = ent['entries'][entry];
                entt['index'] = index++;
                newentry.push(entt);
            }
            ent['entries'] = newentry;
        }
        await (0, fs_1.writeFileSync)(targetPath + `${lang}_item.json`, JSON.stringify(entity, null, 4));
    }
    for (const lang of list) {
        const host = (0, content_1.GetStaticURL)(lang);
        const [out, err] = await (0, cli_1.default)('curl', [host]);
        const entity = JSON.parse(out);
        if (Object.prototype.hasOwnProperty.call(entity, 'error')) {
            continue;
        }
        for (const ent of entity['result']) {
            let index = 1;
            for (const entry of ent['entries']) {
                entry['index'] = index++;
            }
        }
        await (0, fs_1.writeFileSync)(targetPath + `${lang}_static.json`, JSON.stringify(entity, null, 4));
    }
    for (const lang of list) {
        const host = (0, content_1.GetStatsURL)(lang);
        const [out, err] = await (0, cli_1.default)('curl', [host]);
        const entity = JSON.parse(out);
        if (Object.prototype.hasOwnProperty.call(entity, 'error')) {
            continue;
        }
        for (const ent of entity['result']) {
            let index = 1;
            for (const entry of ent['entries']) {
                entry['index'] = index++;
            }
        }
        await (0, fs_1.writeFileSync)(targetPath + `${lang}_stats.json`, JSON.stringify(entity, null, 4));
    }
    console.log('Get All File From Offical Website');
}
exports.FetchAllDataFromOffical = FetchAllDataFromOffical;
//# sourceMappingURL=fetchdata.js.map