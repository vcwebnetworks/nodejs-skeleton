import { config } from 'dotenv';
import { resolve } from 'path';

const environments: { [key: string]: string } = {
  test: '.env.test',
  default: '.env',
};

const environment = environments[process.env.NODE_ENV ?? 'default'];
const path = resolve(__dirname, '..', environment);

config({
  path,
  encoding: 'utf-8',
});
