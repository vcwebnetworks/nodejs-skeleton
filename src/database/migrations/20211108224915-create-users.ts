import { DataTypes, QueryInterface } from 'sequelize';

import { Tables } from '@/enums';
import { migrationAddDefaultColumns } from '@/utils';

const tableName = Tables.USER;

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    );

    await queryInterface.createTable(
      tableName,
      migrationAddDefaultColumns({
        softDelete: true,
        mergeColumns: {
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        },
      }),
    );

    await queryInterface.addIndex(tableName, ['id']);
    await queryInterface.addIndex(tableName, ['email'], { unique: true });
    await queryInterface.addIndex(tableName, ['created_at']);
    await queryInterface.addIndex(tableName, ['updated_at']);
    await queryInterface.addIndex(tableName, ['deleted_at']);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(tableName, { cascade: true });
  },
};
