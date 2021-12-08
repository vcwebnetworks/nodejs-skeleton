import '../config/dotenv';

import childProcess from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(childProcess.exec);

export const runMigrations = async () => {
  await execPromise('npx sequelize-cli db:migrate', {
    env: process.env,
  });
};
