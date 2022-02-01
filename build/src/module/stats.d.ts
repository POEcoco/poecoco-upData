/**
 * 是否在陣列中包含
 * @param text 輸入完整名稱
 * @param entries 要搜尋的陣列
 * @returns 布林值
 */
/**
 * 寫入本地的詞綴JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
export declare function WriteStatsJsonToLocal(lang: string, data: any): Promise<any>;
export declare function WriteStatsJsonToFetchPath(lang: string, data: any): Promise<any>;
/**
 * 讀取本地的詞綴JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
export declare function LoadLocalStatsJson(lang: string): Promise<any>;
/**
 * 讀取本地的物品JSON集合
 *  @returns JSON{
 *  GB:{"result":[]},
 *  TW:{"result":[]},
 *  CN:{"result":[]},
 *  KR:{"result":[]},.....
 * }
 **/
export declare function LoadAllLocalStatsJson(input_p: string): Promise<any>;
/**
 * 從官網拉取JSON
 *  @returns JSON{
 *  result:[],
 * }
 **/
export declare function FetchNewStatsJson(lang: string): Promise<any>;
export declare function GeneratedNewData(): Promise<void>;
