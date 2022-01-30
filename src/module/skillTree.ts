import {readFileSync, writeFileSync} from 'fs';
import exec from '../utility/cli';

const PASSIVETREEPATH = 'https://www.pathofexile.com/passive-skill-tree'; //TO GET PASSIVETREE
const ActivePath = './output/skilltree';

/**
 * 讀取本地的技能樹JSON
 *  @returns JSON
 **/
export async function LoadLocalSkillTreeJson(): Promise<any> {
  let result = {};
  const str = await readFileSync(ActivePath + 'skillTree.json', 'utf8');
  result = JSON.parse(str);
  return result;
}

/**
 * 寫入本地的物品JSON
 *  @param lang Language KEY
 *  @returns JSON
 **/
export async function WriteSkillTreeJsonToLocal(data: any): Promise<any> {
  await writeFileSync(
    ActivePath + 'skillTree.json',
    JSON.stringify(data, null, 4)
  );
}
/**
 * 從網路獲取新的技能樹JSON
 * @returns JSON
 */
export async function FetchNewSkillTree(): Promise<any> {
  let result: any = {};
  //獲取位置
  const host = PASSIVETREEPATH;
  //HTML本體
  const [out] = await exec('curl', [host]);
  //關鍵字位置
  const key = 'var passiveSkillTreeData = {';
  const pos = out.indexOf(key);
  const limit = out.length;
  //調整開始位置
  let data = '{';
  let counter = pos + key.length;
  let lefS = 1;
  //爬找生成JSON
  while (counter < limit) {
    if (lefS === 0) {
      break;
    }
    if (out[counter] === '{') {
      lefS++;
    } else if (out[counter] === '}') {
      lefS--;
    }
    data += out[counter];
    counter++;
  }
  try {
    result = JSON.parse(data);
  } catch (err) {
    throw new Error('技能樹更新失敗');
  }

  return result;
}

export function GeneratedNewData() {
  throw new Error('Function not implemented.');
}
