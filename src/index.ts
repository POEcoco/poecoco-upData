import {FetchAllDataFromOffical} from './module/fetchdata';
import {GenerateBlackList} from './module/items';
import {CheckLength} from './module/stats';

const FetchNewData = false;
async function main() {
  //Get all source data
  if (FetchNewData) {
    await FetchAllDataFromOffical();
  }
  //Check file has been edit or not

  await GenerateBlackList();
}
main();
