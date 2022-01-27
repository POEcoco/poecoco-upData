import {writeFileSync} from 'fs';
import exec from '../utility/cli';
import {
  GetItemsURL,
  GetLanguageKeys,
  GetStaticURL,
  GetStatsURL,
} from '../content';

export async function GetAllNewData() {
  const list = GetLanguageKeys();
  for (const lang of list) {
    const host = GetItemsURL(lang);
    const [out, err] = await exec('curl', [host]);
    const entity = JSON.parse(out);
    if (Object.prototype.hasOwnProperty.call(entity, 'error')) {
      continue;
    }

    for (const ent of entity['result']) {
      let index = 1;
      const newentry: any = [];
      for (const entry in ent['entries']) {
        if (
          Object.prototype.hasOwnProperty.call(ent['entries'][entry], 'flags')
        ) {
          continue;
        }
        const entt = ent['entries'][entry];
        entt['index'] = index++;
        newentry.push(entt);
      }
      ent['entries'] = newentry;
    }
    await writeFileSync(
      `./output/old/${lang}_item.json`,
      JSON.stringify(entity, null, 4)
    );
  }

  for (const lang of list) {
    const host = GetStaticURL(lang);
    const [out, err] = await exec('curl', [host]);
    const entity = JSON.parse(out);
    if (Object.prototype.hasOwnProperty.call(entity, 'error')) {
      continue;
    }
    for (const ent of entity['result']) {
      let index = 1;
      for (const entry of ent['entries']) {
        entry['index'] = index++;
      }
    }
    await writeFileSync(
      `./output/old/${lang}_static.json`,
      JSON.stringify(entity, null, 4)
    );
  }

  for (const lang of list) {
    const host = GetStatsURL(lang);
    const [out, err] = await exec('curl', [host]);
    const entity = JSON.parse(out);
    if (Object.prototype.hasOwnProperty.call(entity, 'error')) {
      continue;
    }
    for (const ent of entity['result']) {
      let index = 1;
      for (const entry of ent['entries']) {
        entry['index'] = index++;
      }
    }
    await writeFileSync(
      `./output/old/${lang}_stats.json`,
      JSON.stringify(entity, null, 4)
    );
  }

  console.log('Get All File From Offical Website');
}
