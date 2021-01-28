import path from 'path';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import sequelizeOptions from '@src/database/config';

const sequelize = new Sequelize({
  ...(sequelizeOptions as SequelizeOptions),
  models: [path.resolve(__dirname, 'models')],
});

export default sequelize;
