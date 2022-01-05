import 'reflect-metadata';

import '../config/dotenv';
import '../config/module-alias';
import '../config/moment-timezone';
import '../translations';

import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { DbType } from '@/enums';
import debug from '@/shared/debug';
import logger from '@/shared/logger';

import sequelizeOptions from './config';
import * as models from './models';
import { DatabaseConnect } from './types';

if (process.env.DB_TYPE === DbType.SQLITE) {
  delete (<any>sequelizeOptions).timezone;
}

if (process.env.NODE_ENV === 'test') {
  (<any>sequelizeOptions).logging = false;
}

const connectionOptions: SequelizeOptions = {
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
};

let database: any;

if (process.env.DB_URI) {
  database = new Sequelize(process.env.DB_URI, connectionOptions);
} else {
  database = new Sequelize({
    ...(sequelizeOptions as SequelizeOptions),
    ...connectionOptions,
  });
}

export const authenticateDatabase = async () => {
  await database.authenticate();

  if (database.options.timezone) {
    await database.query(`SET timezone TO '${database.options.timezone}'`);
  }

  if (database.options.define?.charset) {
    await database.query(
      `SET client_encoding TO '${database.options.define?.charset}'`,
    );
  }

  logger.info('database connection has been established successfully.');
};

export default database as DatabaseConnect;
