import 'reflect-metadata';
import './dotenv';
import './config/module-alias';

import * as Sentry from '@sentry/node';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import http from 'http';

import configSentry from '@src/config/sentry';
import sequelize from '@src/database';
import Helpers from '@src/helpers/Helpers';
import apiTokenMiddleware from '@src/middlewares/ApiTokenMiddleware';
import corsMiddleware from '@src/middlewares/CorsMiddleware';
import errorHandlerMiddleware from '@src/middlewares/ErrorHandlerMiddleware';
import methodOverrideMiddleware from '@src/middlewares/MethodOverrideMiddleware';
import morganMiddleware from '@src/middlewares/MorganMiddleware';
import notFoundMiddleware from '@src/middlewares/NotFoundMiddleware';
import rateLimiterMiddleware from '@src/middlewares/RateLimiterMiddleware';
import appRoutes from '@src/routes';

class App {
  protected app: express.Application;
  protected server: http.Server;
  protected port: number;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.port = Number(process.env.PORT || 3333);

    if (configSentry.enable) {
      Sentry.init({ dsn: process.env.SENTRY_DSN });
    }

    this.app.set('trust proxy', true);
    this.app.set('x-powered-by', false);

    this.server.on('listening', () => {
      this.registerMiddlewares();
    });
  }

  public registerMiddlewares(): void {
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

    if (Helpers.normalizeValue<boolean>(process.env.PROTECT_ALL_ROUTES_WITH_TOKEN)) {
      this.app.use(apiTokenMiddleware);
    }

    this.app.use(appRoutes);
    this.app.use(notFoundMiddleware);

    if (configSentry.enable) {
      this.app.use(Sentry.Handlers.errorHandler());
    }

    this.app.use(errorHandlerMiddleware);
  }

  public async start(): Promise<http.Server> {
    return new Promise(resolve => {
      this.server.listen(this.port, () => resolve(this.server));
    });
  }

  public async close(): Promise<void> {
    await sequelize.close();

    if (!this.server.listening) {
      return;
    }

    await new Promise((resolve, reject) => {
      this.server.close(err => {
        if (err) {
          reject(err);
        }

        resolve(true);
      });
    });
  }

  public getServer(): http.Server {
    return this.server;
  }

  public getInstance(): express.Application {
    return this.app;
  }
}

export default new App();
