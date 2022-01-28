export declare function GenerateBlackList(): Promise<void>;
/**
 * 獲取本地的物品JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
export declare function GetLocalItemJson(lang: string): Promise<any>;
/**
 * 寫入本地的物品JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
export declare function WriteItemJsonToLocal(lang: string, data: any): Promise<any>;
/**
 * 獲取本地的物品JSON集合
 *  @returns JSON{
 *  GB:{},
 *  TW:{},
 *  CN:{},
 *  KR:{},.....
 * }
 **/
export declare function GetAllLocalItemJson(): Promise<any>;
