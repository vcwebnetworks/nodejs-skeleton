import 'reflect-metadata';
import './config/module-alias';
import './dotenv';

import * as Sentry from '@sentry/node';
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

    if (this.isSentry()) {
      Sentry.init({ dsn: process.env.SENTRY_DSN });
    }

    this.app.set('trust proxy', true);
    this.app.set('x-powered-by', false);

    this.server.on('listening', () => {
      import('@src/database').then(() => {
        this.middlewares();
      });
    });
  }

  private middlewares(): void {
    if (this.isSentry()) {
      this.app.use(Sentry.Handlers.requestHandler());
    }

    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(CorsMiddleware);
    // this.app.use(ApiTokenMiddleware);
    this.app.use(routes);
    this.app.use(NotFoundMiddleware);

    if (this.isSentry()) {
      this.app.use(Sentry.Handlers.errorHandler());
    }

    this.app.use(ErrorHandlerMiddleware);
  }

  private isSentry() {
    return process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN;
  }
}

export default new App().server;
