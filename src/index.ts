import {DefaultProcess} from './module/module';
import * as core from '@actions/core';

async function main() {
  try {
    //主要流程
    await DefaultProcess();
  } catch (err) {
    //Failed the process;
    const msg = JSON.stringify(err);
    core.setFailed(msg);
  }
  core.info('更新完成!!');
}
main();
