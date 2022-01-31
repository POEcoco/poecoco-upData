import {GetLanguageKeys} from '../content';
import * as items from './items';
import * as skillTree from './skillTree';
import * as stats from './stats';
/**基礎的流程(拉取新資料 → 比對翻譯資料 → 寫入output以供poecoco使用) */
export async function DefaultProcess() {
  //拉取新資料
  //await FetchAllDataFromOffical();
  //生成新資料
  await items.GeneratedNewData();
  await stats.GeneratedNewData();
  await skillTree.GeneratedNewData();
}

/**從網路獲取所有要處理的JSON */
export async function FetchAllDataFromOffical() {
  //獲取語言列表
  const list = GetLanguageKeys();
  //更新每個物品JSON
  for (const lang of list) {
    const entity = await items.FetchNewItemJson(lang);
    await items.WriteItemJsonToLocal(lang, entity);
  }
  //更新每個詞綴JSON
  for (const lang of list) {
    const entity = await stats.FetchNewStatsJson(lang);
    await stats.WriteStatsJsonToLocal(lang, entity);
  }
  //更新技能樹JSON
  const skTree = await skillTree.FetchNewSkillTree();
  await skillTree.WriteSkillTreeJsonToLocal(skTree);

  console.log('Fetch All new Files From Offical Website');
}
