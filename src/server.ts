import './config/module-alias';

import fs from 'fs';
import { resolve } from 'path';

import app from './app';
import configApp from './config/app';
import Debug from './helpers/Debug';

if (configApp.startServerCheckEnvironment) {
  const file = fs.existsSync(resolve(__dirname, '..', '.env'));

  if (!file) {
    throw new Error('File .env doest not exists.');
  }
}

const SERVER_HOST = String(process.env.SERVER_HOST) ?? '0.0.0.0';
const SERVER_PORT = Number(process.env.SERVER_PORT) ?? 3333;

app.listen(SERVER_PORT, SERVER_HOST, () => {
  Debug.run({
    namespace: 'server',
    message: `🚀 Server started on port http://%s:%d`,
    args: [SERVER_HOST, SERVER_PORT],
  });
});
