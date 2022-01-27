import {readFileSync, statSync, writeFileSync} from 'fs';
import {GetLanguageKeys} from './content';
import {GetAllNewData} from './module/module';
const targetPath = './output/old/';
const list = GetLanguageKeys();

const earlyget = false;

async function main() {
  //Get all source data
  if (earlyget) await GetAllNewData();
  //Check file has been edit or not

  //基準檔案
  let standJSON = JSON.parse(readFileSync(targetPath + 'GB_item.json', 'utf8'))[
    'result'
  ];
  let dateList: Date[] = await updateDateModified();
  let broken = false; //截斷
  let modified = false; //新更改
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (broken) {
      broken = !broken;
      continue;
    }
    //檢查是否有新的更改
    modified = false;
    for (const i in list) {
      const stat = await statSync(targetPath + `${list[i]}_item.json`);
      if (stat.mtime.getTime() !== dateList[i].getTime()) {
        modified = true;
      }
    }

    if (modified) {
      try {
        //reload
        standJSON = JSON.parse(
          readFileSync(targetPath + 'GB_item.json', 'utf8')
        )['result'];

        //基準檔案全體重新編號
        for (const ii in standJSON) {
          let index = 1;
          for (const iii of standJSON[ii]['entries']) {
            iii['index'] = index++;
          }
        }
        await writeFileSync(
          targetPath + 'GB_item.json',
          JSON.stringify(
            {
              result: standJSON,
            },
            null,
            4
          )
        );
        //reload
        standJSON = JSON.parse(
          readFileSync(targetPath + 'GB_item.json', 'utf8')
        )['result'];
      } catch {
        continue;
      }

      //比較的檔案重新編號
      for (const i in list) {
        const str = await readFileSync(
          targetPath + `${list[i]}_item.json`,
          'utf8'
        );
        let compareJSON: any = {};
        try {
          compareJSON = JSON.parse(str)['result'];
        } catch {
          continue;
        }
        for (const ii in compareJSON) {
          let index = 1;
          for (const iii of compareJSON[ii]['entries']) {
            iii['index'] = index++;
          }
          await writeFileSync(
            targetPath + `${list[i]}_item.json`,
            JSON.stringify(
              {
                result: compareJSON,
              },
              null,
              4
            )
          );
        }

        for (const ii in compareJSON) {
          if (
            compareJSON[ii]['entries'].length !==
            standJSON[ii]['entries'].length
          ) {
            console.log(
              list[i] +
                '-' +
                compareJSON[ii]['entries'].length +
                ':' +
                standJSON[ii]['entries'].length +
                `-GB  in ${standJSON[ii]['label']}`
            );
            modified = !modified;
            dateList = await updateDateModified();
            broken = true;
            break;
          }
        }
        if (broken) {
          broken = !broken;
          break;
        }
      }
    }
  }
}
main();

async function updateDateModified(): Promise<Date[]> {
  const dateList: Date[] = [];
  for (const lang of list) {
    const stat = await statSync(targetPath + `${lang}_item.json`);
    dateList.push(stat.mtime);
  }
  return dateList;
}
