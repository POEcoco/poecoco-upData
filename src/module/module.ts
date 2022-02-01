import * as core from '@actions/core';
import {GetLanguageKeys} from '../content';
import * as items from './items';
import * as skillTree from './skillTree';
import * as stats from './stats';
/**基礎的流程(拉取新資料 → 比對翻譯資料 → 寫入output以供poecoco使用) */
export async function DefaultProcess() {
  const err: any[] = [];

  //拉取新資料
  try {
    await FetchAllDataFromOffical();
  } catch (error) {
    err.push(error);
  }
  //生成新資料
  try {
    await items.GeneratedNewData();
  } catch (error) {
    err.push(error);
  }
  try {
    await stats.GeneratedNewData();
  } catch (error) {
    err.push(error);
  }
  //更新技能樹
  try {
    await skillTree.GeneratedNewData();
  } catch (error) {
    err.push(error);
  }

  if (err.length > 0) {
    throw new Error(err.toString());
  }
}

/**從網路獲取所有要處理的JSON */
export async function FetchAllDataFromOffical() {
  //獲取語言列表
  const list = GetLanguageKeys();
  //更新每個物品JSON
  for (const lang of list) {
    const entity = await items.FetchNewItemJson(lang);
    if (Object.prototype.hasOwnProperty.call(entity, 'error')) {
      continue; //中國伺服器會擋交易API
    }
    await items.WriteItemJsonToFetchPath(lang, entity);
  }
  //更新每個詞綴JSON
  for (const lang of list) {
    const entity = await stats.FetchNewStatsJson(lang);
    if (Object.prototype.hasOwnProperty.call(entity, 'error')) {
      continue; //中國伺服器會擋交易API
    }
    await stats.WriteStatsJsonToFetchPath(lang, entity);
  }
  //更新技能樹JSON
  const skTree = await skillTree.FetchNewSkillTree();
  await skillTree.WriteSkillTreeJsonToLocal(skTree);

  core.info('Fetch All new Files From Offical Website');
}
