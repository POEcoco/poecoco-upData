import {GetItemsURL, GetLanguageKeys} from '../content';
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
function isContain(text: string, entries: any[]): number {
  let result = -1;
  for (let i = 0; i < entries.length; i++) {
    if (entries[i]['text'] === text) {
      result = i;
      break;
    }
  }
  return result;
}

/**
 * 寫入本地的物品JSON
 *  @param lang Language KEY
 *  @param data content
 *  @returns JSON
 **/
export async function WriteItemJsonToLocal(
  lang: string,
  data: any
): Promise<any> {
  await writeFileSync(
    LocalPath + `${lang}_item.json`,
    JSON.stringify(data, null, 4)
  );
}

/**
 * 讀取新獲取的本地物品JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
export async function LoadLocalItemJson(lang: string): Promise<any> {
  let result = {};
  const str = await readFileSync(FetchPath + `${lang}_item.json`, 'utf8');
  result = JSON.parse(str);
  return result;
}
/**
 * 讀取新獲取的本地物品JSON集合
 *  @returns JSON{
 *  GB:{"result":{}},
 *  TW:{"result":{}},
 *  CN:{"result":{}},
 *  KR:{"result":{}},.....
 * }
 **/
export async function LoadAllLocalItemJson(input_p: string): Promise<any> {
  const list = GetLanguageKeys();
  const collection: any = {};
  for (const lang of list) {
    const str = await readFileSync(input_p + `${lang}_item.json`, 'utf8');
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
export async function FetchNewItemJson(lang: string): Promise<any> {
  let result: any = {};
  const host = GetItemsURL(lang);
  const [out] = await exec('curl', [host]);

  result = JSON.parse(out);
  return result;
}

export async function GeneratedNewData() {
  const list = GetLanguageKeys();
  const newcollection = await LoadAllLocalItemJson('./output/fetch/');
  const oldcollection = await LoadAllLocalItemJson('./output/items/');
  const blackCollection = await LoadAllLocalItemJson('./output/blacklist/');

  /*
    標註: 要考慮到可能會有新增的集合，或是新資料有沒有正確比對到舊集合
  */

  const [idlength, IDs] = filterIDs(newcollection['GB']['result']);
  for (const lang of list) {
    const [idlengthtemp] = filterIDs(newcollection[lang]['result']);
    if (idlengthtemp !== idlength) {
      throw new Error('新獲取的資料之間，大分類資料長度不同');
    }
  }
  for (const lang of list) {
    for (const id of IDs) {
      //
      let elements = newcollection[lang]['result'];
      const [targetElement, targetindex] = filterElementByIDs(elements, id);
      elements = blackCollection[lang]['result'];
      const [blackElement] = filterElementByIDs(elements, id);
      elements = oldcollection[lang]['result'];
      const [oldElement] = filterElementByIDs(elements, id);
      //element['entries']
      const templist = [];
      for (const index in targetElement['entries']) {
        //刪除黑名單
        let erase = isContain(
          targetElement['entries'][index]['text'],
          blackElement['entries']
        );
        if (erase !== -1) {
          continue;
        }
        //刪除舊檔案
        erase = isContain(
          targetElement['entries'][index]['text'],
          oldElement['entries']
        );
        if (erase !== -1) {
          continue;
        }
        templist.push(targetElement['entries'][index]);
      }
      newcollection[lang]['result'][targetindex]['entries'] = templist;
      //
    }
  }

  //檢查新資料長度是否不一樣
  for (const lang of list) {
    const [idlengthtemp] = filterIDs(newcollection[lang]['result']);
    if (idlengthtemp !== idlength) {
      throw new Error('各個新資料之間，大分類資料長度不同');
    }
  }
  //合併新舊名單
  for (const lang of list) {
    for (const id of IDs) {
      let elements = newcollection[lang]['result'];
      const [targetElement] = filterElementByIDs(elements, id);
      elements = oldcollection[lang]['result'];
      const [oldElement] = filterElementByIDs(elements, id);
      //element['entries']
      for (const index in targetElement['entries']) {
        oldElement['entries'].push(targetElement['entries'][index]);
      }
    }
  }
  //為所有資料編號?
  //生成供poecoco使用的資料

  //寫入本地檔案
  for (const lang of list) {
    await WriteItemJsonToLocal(lang, oldcollection[lang]);
  }

  console.log('');
}

//#region  ---combine toolkit ---
/**
 * 獲取ID的列表以及數量
 * @param elements 大分類的陣列
 * @returns [number, IDs] 獲取ID列表以及數量
 */
function filterIDs(elements: any[]): [number, string[]] {
  const result: string[] = [];
  for (const entry of elements) {
    result.push(entry['id']);
  }
  return [result.length, result];
}
/**
 * 用ID獲取大分類
 * @param elements 大分類的集合
 * @param id 大分類的標籤
 * @returns JSON 大分類
 */
function filterElementByIDs(elements: any[], id: string): [any, number] {
  let result: any = {};
  let index = -1;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i]['id'] === id) {
      result = elements[i];
      index = i;
      break;
    }
  }
  //make a copy
  const str = JSON.stringify(result);
  result = JSON.parse(str);
  return [result, index];
}
//#endregion
