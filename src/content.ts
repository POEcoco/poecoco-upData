const GETSTATIC = '/api/trade/data/static'; //GET urrency data list
const GETSTATS = '/api/trade/data/stats'; //GET Mods list
const GETITEMS = '/api/trade/data/items'; //GET Items list

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
export function GetLanguageLabels(): string[] {
  const result = [];
  for (let i = 0; i < SourceList.length; i++) {
    result[i] = SourceList[i].LABEL;
  }
  return result;
}

//GET Language keys
export function GetLanguageKeys(): string[] {
  const result = [];
  for (let i = 0; i < SourceList.length; i++) {
    result[i] = SourceList[i].KEY;
  }
  return result;
}

//GET Language list
export function GetLanguageHOSTs(): string[] {
  const result = [];
  for (let i = 0; i < SourceList.length; i++) {
    result[i] = SourceList[i].HOST;
  }
  return result;
}

//Get request URL with args
export function GetHostByLang(lang: string): string {
  let result = '';
  for (let i = 0; i < SourceList.length; i++) {
    if (lang === SourceList[i].KEY) {
      result = SourceList[i].HOST;
      break;
    }
  }
  return result;
}

//Get request URL with args
export function GetStaticURL(lang: string): string {
  const HOST = GetHostByLang(lang);

  return HOST + GETSTATIC;
}

//Get request URL with args
export function GetStatsURL(lang: string): string {
  const HOST = GetHostByLang(lang);
  return HOST + GETSTATS;
}

//Get request URL with args
export function GetItemsURL(lang: string): string {
  const HOST = GetHostByLang(lang);
  return HOST + GETITEMS;
}
