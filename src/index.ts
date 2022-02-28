import {DefaultProcess} from './module/module';
import * as core from '@actions/core';

async function main() {
  try {
    //主要流程
    await DefaultProcess();
  } catch (err: any) {
    //Failed the process;
    const msg = JSON.stringify(err.message);
    core.setFailed(msg);
  }
  core.info(`所有流程更新完成!! ${new Date().toString()}`);
}
main();
