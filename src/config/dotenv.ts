import './module-alias';

import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

import logger from '@/shared/logger';

const environments: { [key: string]: string } = {
  test: '.env.test',
  production: '.env.production',
  development: '.env.development',
};

const envPath = environments[process.env.NODE_ENV ?? 'development'];
const rootPath = resolve(__dirname, '..', '..');
let envFinalPath = resolve(rootPath, envPath);

if (!existsSync(envFinalPath)) {
  envFinalPath = resolve(rootPath, '.env');
}

if (process.env.CHECK_ENVFILE === 'true' && !existsSync(envFinalPath)) {
  throw new Error(`File ${envFinalPath} doest not exists.`);
}

config({ path: envFinalPath, encoding: 'utf-8' });

logger.info('server using environment', {
  path: envFinalPath,
  environment: process.env.NODE_ENV,
});
