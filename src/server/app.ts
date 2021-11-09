import 'reflect-metadata';

import '@config/dotenv';
import '@config/module-alias';
import '@config/moment-timezone';
import '@config/yup-locale';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import cookieParser from 'cookie-parser';
import express, { ErrorRequestHandler, RequestHandler } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import http from 'http';
import httpGraceFullShutdown from 'http-graceful-shutdown';

import configApp from '@config/app';
import configSentry from '@config/sentry';
import routes from '@server/routes';
import {
  corsMiddleware,
  errorHandlerMiddleware,
  methodOverrideMiddleware,
  morganMiddleware,
  notFoundMiddleware,
  rateLimiterMiddleware,
} from '@src/middlewares';

export class App {
  protected app: express.Application;
  protected server: http.Server;
  protected port: number;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.port = Number(process.env.PORT || 3333);

    if (configSentry.enable) {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 1.0,
        integrations: [
          new Sentry.Integrations.Http({ tracing: true }),
          new Tracing.Integrations.Express({
            app: this.app,
            router: routes,
            methods: ['all'],
          }),
        ],
      });
    }

    this.app.set('trust proxy', true);
    this.app.set('x-powered-by', false);

    this.server.on('listening', () => {
      this.registerMiddlewares();
    });
  }

  public registerMiddlewares(): void {
    if (configSentry.enable) {
      this.app.use(Sentry.Handlers.requestHandler() as RequestHandler);
      this.app.use(Sentry.Handlers.tracingHandler() as RequestHandler);
    }

    this.app.use(helmet() as RequestHandler);
    this.app.use(express.json() as RequestHandler);
    this.app.use(express.urlencoded({ extended: true }) as RequestHandler);
    this.app.use(cookieParser(configApp.appKey));
    this.app.use(morganMiddleware as RequestHandler);
    this.app.use(corsMiddleware);
    this.app.use(methodOverrideMiddleware);
    this.app.use(rateLimiterMiddleware);

    if (configApp.enableUpload) {
      this.app.use('/uploads', express.static(configApp.uploadDir));
    }

    this.app.use(routes);
    this.app.use(notFoundMiddleware);

    if (configSentry.enable) {
      this.app.use(Sentry.Handlers.errorHandler() as ErrorRequestHandler);
    }

    this.app.use(errorHandlerMiddleware);
  }

  public async start(): Promise<http.Server> {
    return new Promise(resolve => {
      this.server = this.server.listen(this.port);
      httpGraceFullShutdown(this.server);
      resolve(this.server);
    });
  }

  public async close(): Promise<void> {
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

const app = new App();
export default app;
