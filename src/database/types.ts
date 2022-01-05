import { Sequelize } from 'sequelize';

export type DatabaseModels = typeof import('./models');
export type DatabaseConnect = Sequelize & { models: DatabaseModels };
