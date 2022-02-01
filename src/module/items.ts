import {GetItemsURL, GetLanguageKeys} from '../content';
import {readFileSync, writeFileSync} from 'fs';
import * as exec from '../utility/cli';

const FetchPath = './output/fetch/';
const LocalPath = './output/items/';

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
 *  依照條件讀取新獲取的本地物品JSON集合
 *  @returns JSON{
 *  GB:{"result":[]},
 *  TW:{"result":[]},
 *  CN:{"result":[]},
 *  KR:{"result":[]},.....
 * }
 **/
export async function LoadAllLocalItemJson(input_p: string): Promise<any> {
  const list = GetLanguageKeys();
  const collection: any = {};
  //獲取基準，只獲取國際版擁有的大類別*/
  const str = await readFileSync(input_p + 'GB_item.json', 'utf8');
  const staJSON = JSON.parse(str);
  const [leg, ids] = filterIDs(staJSON['result']);

  //套用
  for (const lang of list) {
    const str = await readFileSync(input_p + `${lang}_item.json`, 'utf8');
    const rawJSON = JSON.parse(str);

    const temp = {
      result: [] as any,
    };
    let adds = false;
    for (const id of ids) {
      const [jso, pos] = filterElementByIDs(rawJSON['result'], id);
      if (pos !== -1) {
        adds = true;
      }
      //如果包含
      if (adds) {
        temp['result'].push(jso);
      } else {
        continue;
      }
    }
    collection[lang] = temp;
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
  const isWin = process.platform === 'win32';

  const out: any = await exec.ExecutePipe('curl', [
    '-H',
    '"Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7"',
    host,
    isWin ? ' ' : '| iconv -f iso8859-1 -t utf-8',
    `> ${FetchPath}${lang}_item.json`,
  ]);
  result = JSON.parse(out);
  return result;
}

export async function GeneratedNewData() {
  const list = GetLanguageKeys();
  const newcollection = await LoadAllLocalItemJson('./output/fetch/');
  const oldcollection = await LoadAllLocalItemJson('./output/items/');
  const blackCollection = await LoadAllLocalItemJson('./output/blacklist/');

  /*
    標註: 要考慮到可能會有新增的集合或刪除的集合，或是新資料有沒有正確比對到舊集合
  */

  const [idlength, IDs] = filterIDs(newcollection['GB']['result']);
  //檢查新資料
  for (const lang of list) {
    const [idlengthtemp] = filterIDs(newcollection[lang]['result']);
    if (idlengthtemp !== idlength) {
      throw new Error('新獲取的資料之間，大分類資料長度不同');
    }
  }
  //檢查舊資料
  for (const id of IDs) {
    const [olength, _] = filterElementByIDs(oldcollection['GB']['result'], id);
    for (const lang of list) {
      const [ele] = filterElementByIDs(oldcollection[lang]['result'], id);
      if (ele['entries'].length !== olength['entries'].length) {
        throw new Error('舊資料之間，細部的資料長度不同');
      }
    }
  }

  //剔除黑名單的成員以及已有的成員
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
      throw new Error('處理過後的各個新資料之間，大分類資料長度不同');
    }
  }

  //合併新舊名單
  for (const lang of list) {
    for (const id of IDs) {
      let elements = newcollection[lang]['result'];
      const [targetElement] = filterElementByIDs(elements, id);
      elements = oldcollection[lang]['result'];
      const [oldElement] = filterElementByIDs(elements, id);
      if (oldElement === {}) {
        //如果是新增加的大分類
        oldcollection[lang]['result'].push(targetElement);
        continue;
      }
      //element['entries']
      for (const index in targetElement['entries']) {
        oldElement['entries'].push(targetElement['entries'][index]);
      }
    }
  }
  //檢查舊資料
  for (const id of IDs) {
    const [olength, _] = filterElementByIDs(oldcollection['GB']['result'], id);
    for (const lang of list) {
      const [ele] = filterElementByIDs(oldcollection[lang]['result'], id);
      if (ele['entries'].length !== olength['entries'].length) {
        throw new Error('嘗試結合的資料之間，細部的資料長度不同');
      }
    }
  }
  //移除已經被刪除的集合
  const newIDs = IDs;
  const [e_num, oldIDs] = filterIDs(oldcollection['GB']['result']);
  const lostIDs = oldIDs.filter(item => newIDs.indexOf(item) < 0);

  for (const lang of list) {
    for (const id of lostIDs) {
      const elements = oldcollection[lang]['result'];
      const [targetElement, pos] = filterElementByIDs(elements, id);
      if (targetElement !== {} && pos > -1) {
        elements.splice(pos, 1);
      }
    }
  }

  //為所有資料編號
  for (const lang of list) {
    let counter = 1;
    for (const elements of oldcollection[lang]['result']) {
      for (const entry of elements['entries']) {
        entry['index'] = counter++;
      }
    }
  }

  //生成供poecoco使用的資料
  await writeFileSync(
    './output/poecoco/coll_items.json',
    JSON.stringify(oldcollection, null, 4)
  );
  //寫入各本地檔案
  for (const lang of list) {
    await WriteItemJsonToLocal(lang, oldcollection[lang]);
  }

  console.log(`${list.length}項的items JSON更新完成`);
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
 * @returns [any, number]，如果沒有找到返回{}以及-1
 */
function filterElementByIDs(elements: any[], id: string): [any, number] {
  let result: any = {};
  let pos = -1;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i]['id'] === id) {
      result = elements[i];
      pos = i;
      break;
    }
  }
  //make a copy
  const str = JSON.stringify(result);
  result = JSON.parse(str);
  return [result, pos];
}
//#endregion
