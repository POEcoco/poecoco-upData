"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetItemsURL = exports.GetStatsURL = exports.GetStaticURL = exports.GetHostByLang = exports.GetLanguageHOSTs = exports.GetLanguageKeys = exports.GetLanguageLabels = void 0;
const GETSTATIC = '/api/trade/data/static'; //GET urrency data list
const GETSTATS = '/api/trade/data/stats'; //GET Mods list
const GETITEMS = '/api/trade/data/items'; //GET Items list
const PASSIVETREEPATH = 'https://www.pathofexile.com/passive-skill-tree'; //TO GET PASSIVETREE
const SourceList = [
    {
        KEY: 'GB',
        HOST: 'https://www.pathofexile.com',
        LABEL: 'English',
    },
    {
        KEY: 'TW',
        HOST: 'https://web.poe.garena.tw',
        LABEL: '繁體中文',
    },
    {
        KEY: 'CN',
        HOST: 'https://poe.game.qq.com',
        LABEL: '简体中文',
    },
    {
        KEY: 'RU',
        HOST: 'https://ru.pathofexile.com',
        LABEL: 'Русский',
    },
    {
        KEY: 'BR',
        HOST: 'https://br.pathofexile.com',
        LABEL: 'Português Brasileiro',
    },
    {
        KEY: 'TH',
        HOST: 'https://th.pathofexile.com',
        LABEL: 'ไทย',
    },
    {
        KEY: 'FR',
        HOST: 'https://fr.pathofexile.com',
        LABEL: 'Français',
    },
    {
        KEY: 'DE',
        HOST: 'https://de.pathofexile.com',
        LABEL: 'Deutsch',
    },
    {
        KEY: 'ES',
        HOST: 'https://es.pathofexile.com',
        LABEL: 'Español',
    },
    {
        KEY: 'KR',
        HOST: 'https://poe.game.daum.net',
        LABEL: '한국어',
    },
];
//GET Language Label
function GetLanguageLabels() {
    const result = [];
    for (let i = 0; i < SourceList.length; i++) {
        result[i] = SourceList[i].LABEL;
    }
    return result;
}
exports.GetLanguageLabels = GetLanguageLabels;
//GET Language keys
function GetLanguageKeys() {
    const result = [];
    for (let i = 0; i < SourceList.length; i++) {
        result[i] = SourceList[i].KEY;
    }
    return result;
}
exports.GetLanguageKeys = GetLanguageKeys;
//GET Language list
function GetLanguageHOSTs() {
    const result = [];
    for (let i = 0; i < SourceList.length; i++) {
        result[i] = SourceList[i].HOST;
    }
    return result;
}
exports.GetLanguageHOSTs = GetLanguageHOSTs;
//Get request URL with args
function GetHostByLang(lang) {
    let result = '';
    for (let i = 0; i < SourceList.length; i++) {
        if (lang === SourceList[i].KEY) {
            result = SourceList[i].HOST;
            break;
        }
    }
    return result;
}
exports.GetHostByLang = GetHostByLang;
//Get request URL with args
function GetStaticURL(lang) {
    const HOST = GetHostByLang(lang);
    return HOST + GETSTATIC;
}
exports.GetStaticURL = GetStaticURL;
//Get request URL with args
function GetStatsURL(lang) {
    const HOST = GetHostByLang(lang);
    return HOST + GETSTATS;
}
exports.GetStatsURL = GetStatsURL;
//Get request URL with args
function GetItemsURL(lang) {
    const HOST = GetHostByLang(lang);
    return HOST + GETITEMS;
}
exports.GetItemsURL = GetItemsURL;
//# sourceMappingURL=content.js.map