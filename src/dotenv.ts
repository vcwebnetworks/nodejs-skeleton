import { config } from 'dotenv';
import { resolve } from 'path';

const environments: { [key: string]: string } = {
  test: '.env.test',
  default: '.env',
};

const environment = environments[process.env.NODE_ENV ?? 'default'];

config({
  path: resolve(__dirname, '..', environment),
  encoding: 'utf-8',
});
