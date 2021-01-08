import 'reflect-metadata';
import './config/module-alias';
import './dotenv';

import * as Sentry from '@sentry/node';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import http from 'http';

import configSentry from '@src/config/sentry';
import apiTokenMiddleware from '@src/middlewares/ApiTokenMiddleware';
import corsMiddleware from '@src/middlewares/CorsMiddleware';
import errorHandlerMiddleware from '@src/middlewares/ErrorHandlerMiddleware';
import methodOverrideMiddleware from '@src/middlewares/MethodOverrideMiddleware';
import morganMiddleware from '@src/middlewares/MorganMiddleware';
import notFoundMiddleware from '@src/middlewares/NotFoundMiddleware';
import rateLimiterMiddleware from '@src/middlewares/RateLimiterMiddleware';

import routes from './routes';

export class App {
  public app: express.Application;
  public server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    if (configSentry.enable) {
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
    if (configSentry.enable) {
      this.app.use(Sentry.Handlers.requestHandler());
    }

    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(rateLimiterMiddleware);
    this.app.use(morganMiddleware);
    this.app.use(corsMiddleware);
    this.app.use(methodOverrideMiddleware);
    this.app.use(apiTokenMiddleware);
    this.app.use(routes);
    this.app.use(notFoundMiddleware);

    if (configSentry.enable) {
      this.app.use(Sentry.Handlers.errorHandler());
    }

    this.app.use(errorHandlerMiddleware);
  }
}

export default new App().server;
