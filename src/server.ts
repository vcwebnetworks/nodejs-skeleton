import './config/module-alias';
import fs from 'fs';
import { resolve } from 'path';

import debugApp from '@src/config/debug';

import server from './app';

fs.promises
  .stat(resolve(__dirname, '..', '.env'))
  .then(() => {
    server.listen(process.env.PORT || 3333, () => {
      debugApp('server')('🚀 Server started on port http://localhost:3333');
    });
  })
  // eslint-disable-next-line no-console
  .catch(console.error);
