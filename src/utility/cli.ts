/*
  There are two exec cmd here:
  1. for @actions/exec
  2. default cmd for pipe operate (cause @actions/exec doesn't support pipe operated)
*/

import * as exe from '@actions/exec';
export async function Execute(
  prop: string,
  args?: string[] | undefined
): Promise<[string, string]> {
  let myOutput = '';
  let myError = '';

  const options: any = {};
  options.listeners = {
    stdout: (data: Buffer) => {
      myOutput += data.toString();
    },
    stderr: (data: Buffer) => {
      myError += data.toString();
    },
  };
  let str = prop;
  if (args !== undefined) {
    for (const key of args) {
      str += ' ' + key;
    }
  }

  await exe.exec(str, undefined, options);
  return [myOutput, myError];
}

import * as exec from 'child_process';
export async function ExecutePipe(prop: string, args?: string[] | undefined) {
  let str = prop;
  if (args !== undefined) {
    for (const key of args) {
      str += ' ' + key;
    }
  }
  return new Promise((resolve, reject) => {
    exec.exec(str, successResponse => resolve(successResponse));
  });
}
