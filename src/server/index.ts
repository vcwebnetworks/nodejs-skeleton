import '../config/module-alias';
import { AddressInfo } from 'net';

import Debug from '@helpers/Debug';

import app from './app';

(async () => {
  try {
    const server = await app.start();
    const { port } = server.address() as AddressInfo;

    Debug.run({
      namespace: 'server',
      message: `🚀 Server started on http://localhost:%d`,
      args: [port],
    });
  } catch (e) {
    await app.close();

    Debug.run({
      namespace: 'server',
      message: `🚨 Server initialization failed: %s`,
      args: [e.message],
    });

    process.exit(0);
  }
})();
