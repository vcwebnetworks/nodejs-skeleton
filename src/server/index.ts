import '../config/dotenv';
import '../config/module-alias';

import { AddressInfo } from 'net';

import database, { authenticateDatabase } from '../database';
import logger from '../shared/logger';
import app from './app';

(async () => {
  try {
    await authenticateDatabase();

    const server = await app.start();
    const { port } = server.address() as AddressInfo;

    logger.info(`server started on http://localhost:${port}`);
  } catch (e) {
    await app.close();
    await database.close();

    logger.error(`server initialization failed`, e);

    process.exit(0);
  }
})();
