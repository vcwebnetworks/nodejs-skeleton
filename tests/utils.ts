import { Application, NextFunction, Request, Response } from 'express';
import supertest from 'supertest';

import app from '@src/app';

const injectHeaderAuthorizationInApp = (application: Application) => {
  application.use((request: Request, _: Response, next: NextFunction) => {
    request.headers.authorization = `Bearer ${process.env.API_KEY}`;

    return next();
  });
};

injectHeaderAuthorizationInApp(app.getInstance());

export const makeServerSupertest = () => {
  return supertest(app.getServer());
};

export const makeAppSupertest = () => {
  app.registerMiddlewares();

  return supertest(app.getInstance());
};
