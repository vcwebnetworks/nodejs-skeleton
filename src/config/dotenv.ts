import './module-alias';

import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

import logger from '@/shared/logger';

const envPath = `.env.${process.env.NODE_ENV}`;
const rootPath = resolve(__dirname, '..', '..');
let envFinalPath = resolve(rootPath, envPath);

if (process.env.NODE_ENV !== 'test' && !existsSync(envFinalPath)) {
  envFinalPath = resolve(rootPath, '.env');
}

const checkEnvFile =
  process.env.CHECK_ENVFILE === 'true' || process.env.NODE_ENV === 'test';

if (checkEnvFile && !existsSync(envFinalPath)) {
  throw new Error(`File ${envFinalPath} doest not exists.`);
}

config({ path: envFinalPath, encoding: 'utf-8' });

logger.info('server using environment', {
  path: envFinalPath,
  environment: process.env.NODE_ENV,
});
