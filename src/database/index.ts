import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

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
