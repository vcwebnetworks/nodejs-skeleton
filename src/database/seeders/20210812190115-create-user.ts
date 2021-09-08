import { QueryInterface, QueryTypes } from 'sequelize';

import configTables from '@config/tables';
import passwordBcrypt from '@shared/password-bcrypt';

export default {
  up: async (queryInterface: QueryInterface) => {
    const totalRole = await queryInterface.sequelize.query<{ total: number }>(
      'SELECT COUNT(1) AS total FROM roles',
      {
        type: QueryTypes.SELECT,
      },
    );

    if (Number(totalRole[0].total) <= 0) {
      await queryInterface.bulkInsert(
        'roles',
        [
          {
            name: 'Administrator',
          },
        ],
        {
          type: QueryTypes.RAW,
        },
      );
    }

    const rowRole = await queryInterface.sequelize.query<{ id: string }>(
      'SELECT id FROM roles ORDER BY created_at DESC',
      {
        type: QueryTypes.SELECT,
      },
    );

    await queryInterface.bulkInsert(configTables.user, [
      {
        name: 'Administrator',
        email: 'admin@mail.com',
        password: await passwordBcrypt.hash('@password@'),
        status: 'online',
        role_id: rowRole[0].id,
      },
    ]);
  },

  down: async (query: QueryInterface) => {
    await query.bulkDelete(configTables.user, {});
  },
};
