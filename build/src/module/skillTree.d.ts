/**
 * 讀取本地的技能樹JSON
 *  @returns JSON
 **/
export declare function LoadLocalSkillTreeJson(): Promise<any>;
/**
 * 寫入本地的物品JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
export declare function WriteSkillTreeJsonToLocal(data: any): Promise<any>;
/**
 * 從網路獲取新的技能樹JSON
 * @returns JSON
 */
export declare function FetchNewSkillTree(): Promise<any>;
export declare function GeneratedNewData(): Promise<void>;
