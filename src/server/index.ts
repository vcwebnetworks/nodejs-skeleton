import '../config/module-alias';
import { AddressInfo } from 'net';

import debug from '@shared/debug';

import app from './app';

(async () => {
  try {
    const server = await app.start();
    const { port } = server.address() as AddressInfo;

    debug({
      namespace: 'server',
      message: `🚀 Server started on http://localhost:%d`,
      args: [port],
    });
  } catch (e) {
    await app.close();

    debug({
      namespace: 'server',
      message: `🚨 Server initialization failed: %s`,
      args: [e.message],
    });

    process.exit(0);
  }
})();
