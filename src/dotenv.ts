import { config } from 'dotenv';

const environments: { [key: string]: string } = {
  test: '.env.test',
  default: '.env',
};

const path = environments[process.env.NODE_ENV ?? 'default'];

config({ path, encoding: 'utf-8' });
