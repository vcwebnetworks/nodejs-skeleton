import { QueryInterface } from 'sequelize';

import passwordBcrypt from '@shared/password-bcrypt';

export default {
  up: async (query: QueryInterface) => {
    await query.bulkInsert('users', [
      {
        name: 'User Name',
        email: 'user@example.com',
        password: await passwordBcrypt.hash('mudar123@'),
      },
    ]);
  },

  down: async (query: QueryInterface) => {
    await query.bulkDelete('users', {});
  },
};
