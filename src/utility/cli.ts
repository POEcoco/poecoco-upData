const exec = require('@actions/exec');
export default async function execute(
  prop: string,
  args: string[]
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

  await exec.exec(prop, args, options);
  return [myOutput, myError];
}
