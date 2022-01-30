import {GetLanguageKeys, GetStatsURL} from '../content';
import {readFileSync, writeFileSync} from 'fs';
import exec from '../utility/cli';

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
export async function WriteStatsJsonToLocal(
  lang: string,
  data: any
): Promise<any> {
  await writeFileSync(
    LocalPath + `${lang}_stats.json`,
    JSON.stringify(data, null, 4)
  );
}

/**
 * 讀取本地的詞綴JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
export async function LoadLocalStatsJson(lang: string): Promise<any> {
  let result = {};
  const str = await readFileSync(FetchPath + `${lang}_stats.json`, 'utf8');
  result = JSON.parse(str);
  return result;
}
/**
 * 讀取本地的物品JSON集合
 *  @returns JSON{
 *  GB:{"result":{}},
 *  TW:{"result":{}},
 *  CN:{"result":{}},
 *  KR:{"result":{}},.....
 * }
 **/
export async function LoadAllLocalStatsJson(): Promise<any> {
  const collection: any = {};
  const list = GetLanguageKeys();
  for (const lang of list) {
    const str = await readFileSync(FetchPath + `${lang}_stats.json`, 'utf8');
    const rawJSON = JSON.parse(str);
    collection[lang] = rawJSON;
  }
  return collection;
}
/**
 * 從官網拉取JSON
 *  @returns JSON{
 *  result:[],
 * }
 **/
export async function FetchNewStatsJson(lang: string): Promise<any> {
  let result: any = {};
  const host = GetStatsURL(lang);
  const [out] = await exec('curl', [host]);

  result = JSON.parse(out);
  return result;
}

export function GeneratedNewData() {
  throw new Error('Function not implemented.');
}
