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

const sequelize = new Sequelize({
  ...(sequelizeOptions as SequelizeOptions),
  models: Object.values(models),
  dialect: process.env.DB_TYPE as SequelizeOptions['dialect'],
  minifyAliases: true,
  logging:
    process.env.DB_LOGGING === 'true'
      ? false
      : (sql: string) => {
          debug({
            namespace: 'sequelize:log',
            message: { sql },
          });
        },
  define: {
    ...sequelizeOptions.define,
    paranoid: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
});

export default sequelize;
