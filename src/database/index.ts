import '../config/dotenv';
import '../config/module-alias';

import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import debug from '@shared/debug';

import sequelizeOptions from './config';
import * as models from './models';

if (process.env.DB_TYPE === 'sqlite') {
  delete (<any>sequelizeOptions).timezone;
}

if (process.env.NODE_ENV === 'test') {
  (<any>sequelizeOptions).logging = false;
}

const database = new Sequelize({
  ...(sequelizeOptions as SequelizeOptions),
  models: Object.values(models),
  dialect: process.env.DB_TYPE as SequelizeOptions['dialect'],
  minifyAliases: true,
  logging:
    process.env.DB_LOGGING === 'false'
      ? false
      : (sql: string) => {
          debug({
            namespace: 'query',
            message: { sql },
          });
        },
  define: {
    ...sequelizeOptions.define,
    paranoid: true,
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
}) as Sequelize & {
  models: typeof models;
};

export default database;
