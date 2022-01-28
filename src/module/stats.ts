import {GetLanguageKeys} from '../content';
import {readFileSync} from 'fs';

const list = GetLanguageKeys();

export async function CheckLength(): Promise<boolean> {
  let result = true;
  //Check Length   (panic)
  const collection = [];
  for (const lang of list) {
    const str = await readFileSync(
      './output/fetch/' + `${lang}_static.json`,
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
        result = false;
      }
    }
  }

  return result;
}
