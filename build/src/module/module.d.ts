/**基礎的流程(拉取新資料 → 比對翻譯資料 → 寫入output以供poecoco使用) */
export declare function DefaultProcess(): Promise<void>;
/**從網路獲取所有要處理的JSON */
export declare function FetchAllDataFromOffical(): Promise<void>;
