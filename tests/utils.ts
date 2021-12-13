import '../src/config/dotenv';
import '../src/config/module-alias';

import { Application, NextFunction, Request, Response } from 'express';
import supertest from 'supertest';

import database from '@/database';
import app from '@/server/app';

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

export const truncateTables = async () => {
  await Promise.all(
    Object.values(database.models).map(async model => {
      await model.destroy({
        where: {},
        force: true,
        truncate: true,
      });
    }),
  );
};

export const truncateTableWithName = async (name: string) => {
  if (database.models[name]) {
    await database.models[name].destroy({
      where: {},
      force: true,
      truncate: true,
    });
  }
};
