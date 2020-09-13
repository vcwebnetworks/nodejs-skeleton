import 'reflect-metadata';
import './config/module-alias';
import './dotenv';

import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import http from 'http';

// import ApiTokenMiddleware from '@src/middlewares/ApiTokenMiddleware';
import CorsMiddleware from '@src/middlewares/CorsMiddleware';
import ErrorHandlerMiddleware from '@src/middlewares/ErrorHandlerMiddleware';
import NotFoundMiddleware from '@src/middlewares/NotFoundMiddleware';

import routes from './routes';

class App {
  public app: express.Application;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.server.on('listening', () => {
      import('@src/database').then(() => {
        this.middlewares();
      });
    });
  }

  private middlewares(): void {
    this.app.use(CorsMiddleware);
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(ApiTokenMiddleware);
    this.app.use(routes);
    this.app.use(NotFoundMiddleware);
    this.app.use(ErrorHandlerMiddleware);
  }
}

export default new App().server;
