import 'reflect-metadata';
import './dotenv';

import http from 'http';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';

import CorsMiddleware from './middlewares/CorsMiddleware';
import ApiTokenMiddleware from './middlewares/ApiTokenMiddleware';
import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware';

import routes from './routes';
import createConnection from './config/database';

class App {
  public app: express.Application;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.database();
    this.middlewares();
  }

  private async database(): Promise<void> {
    this.app.databaseConnection = await createConnection();
  }

  private middlewares(): void {
    this.app.use(helmet({ hidePoweredBy: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(CorsMiddleware);
    this.app.use(ApiTokenMiddleware);
    this.app.use(routes);
    this.app.use(ErrorHandlerMiddleware);
  }
}

export default new App().server;
