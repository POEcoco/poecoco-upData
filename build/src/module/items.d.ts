/**
 * 是否在陣列中包含
 * @param text 輸入完整名稱
 * @param entries 要搜尋的陣列
 * @returns 布林值
 */
/**
 * 寫入本地的物品JSON
 *  @param lang Language KEY
 *  @param data content
 *  @returns JSON
 **/
export declare function WriteItemJsonToLocal(lang: string, data: any): Promise<any>;
/**
 * 讀取新獲取的本地物品JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
export declare function LoadLocalItemJson(lang: string): Promise<any>;
/**
 * 讀取新獲取的本地物品JSON集合
 *  @returns JSON{
 *  GB:{"result":{}},
 *  TW:{"result":{}},
 *  CN:{"result":{}},
 *  KR:{"result":{}},.....
 * }
 **/
export declare function LoadAllLocalItemJson(input_p: string): Promise<any>;
/**
 * 從官網拉取JSON
 *  @returns JSON{
 *  result:[],
 * }
 **/
export declare function FetchNewItemJson(lang: string): Promise<any>;
export declare function GeneratedNewData(): Promise<void>;
