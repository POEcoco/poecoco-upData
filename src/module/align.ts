/*  這檔案遲早要改或刪除*/
import {readFileSync, statSync, writeFileSync} from 'fs';
import {GetLanguageKeys} from '../content';

const fetchPath = './output/fetch/';
const list = GetLanguageKeys();

//無限LOOP 以輔助修改檔案
export async function Align() {
  //基準檔案
  let standJSON = JSON.parse(readFileSync(fetchPath + 'GB_item.json', 'utf8'))[
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
      const stat = await statSync(fetchPath + `${list[i]}_item.json`);
      if (stat.mtime.getTime() !== dateList[i].getTime()) {
        modified = true;
      }
    }

    if (modified) {
      try {
        //reload
        standJSON = JSON.parse(
          readFileSync(fetchPath + 'GB_item.json', 'utf8')
        )['result'];

        //基準檔案全體重新編號
        for (const ii in standJSON) {
          let index = 1;
          for (const iii of standJSON[ii]['entries']) {
            iii['index'] = index++;
          }
        }
        await writeFileSync(
          fetchPath + 'GB_item.json',
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
          readFileSync(fetchPath + 'GB_item.json', 'utf8')
        )['result'];
      } catch {
        continue;
      }

      //比較的檔案重新編號
      for (const i in list) {
        const str = await readFileSync(
          fetchPath + `${list[i]}_item.json`,
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
            fetchPath + `${list[i]}_item.json`,
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

async function updateDateModified(): Promise<Date[]> {
  const dateList: Date[] = [];
  for (const lang of list) {
    const stat = await statSync(fetchPath + `${lang}_item.json`);
    dateList.push(stat.mtime);
  }
  return dateList;
}

//結合兩邊的檔案
export async function Combine() {
  //Combine

  for (const lang of list) {
    //get type
    const typeJSON = JSON.parse(
      readFileSync('./output/source/' + `${lang}_item_ontype.json`, 'utf8')
    )['result'];
    //get uniquie
    const uniJSON = JSON.parse(
      readFileSync('./output/source/' + `${lang}_item_uni.json`, 'utf8')
    )['result'];

    if (typeJSON.length !== uniJSON.length) {
      throw new Error('');
    }
    const resultJSON = uniJSON;
    //Start to combine
    for (const key in resultJSON) {
      for (const ii in typeJSON[key]['entries']) {
        const value = typeJSON[key]['entries'][ii];

        resultJSON[key]['entries'].push(value);
      }
    }
    // make index
    for (const key in resultJSON) {
      let index = 0;
      for (const ii in resultJSON[key]['entries']) {
        resultJSON[key]['entries']['index'] = index++;
      }
    }

    await writeFileSync(
      './output/result/' + `${lang}_item.json`,
      JSON.stringify(
        {
          result: resultJSON,
        },
        null,
        4
      )
    );
  }
  //Check Length   (panic)
  const collection = [];
  for (const lang of list) {
    const str = await readFileSync(
      './output/result/' + `${lang}_item.json`,
      'utf8'
    );
    const typeJSON = JSON.parse(str)['result'];
    collection.push(typeJSON);
  }
  const length = [];
  for (const JSONs of collection) {
    const enet = [];
    for (const ii of JSONs) {
      enet.push(ii['entries'].length);
    }
    length.push(enet);
  }
  for (const i in collection) {
    for (let ii = 0; ii < collection[i].length; ii++) {
      const answer = length[i][ii];
      if (answer !== collection[i][ii]['entries'].length) {
        throw new Error('');
      }
    }
  }
  console.log('Combine and check Finish!');
}
