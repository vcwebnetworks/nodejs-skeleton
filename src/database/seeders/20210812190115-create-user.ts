import { QueryInterface } from 'sequelize';

import configTables from '@config/tables';
import passwordBcrypt from '@shared/password-bcrypt';

export default {
  up: async (query: QueryInterface) => {
    await query.bulkInsert(configTables.user, [
      {
        name: 'Administrator',
        email: 'admin@test.com',
        password: await passwordBcrypt.hash('mudar123@@'),
      },
    ]);
  },

  down: async (query: QueryInterface) => {
    await query.bulkDelete(configTables.user, {});
  },
};
