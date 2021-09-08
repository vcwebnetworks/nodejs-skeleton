import childProcess from 'child_process';
import { promisify } from 'util';

export const mkdirp = async (path: string) => {
  await promisify(childProcess.exec)(`mkdir -p ${path}`);
};
