import { DataTypes, literal, QueryInterface } from 'sequelize';

import configTables from '@config/tables';

const tableName = configTables.admin.resource;

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: literal('uuid_generate_v4()'),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });

    await queryInterface.addIndex(tableName, ['id']);
    await queryInterface.addIndex(tableName, ['path']);
    await queryInterface.addIndex(tableName, ['method']);
    await queryInterface.addIndex(tableName, ['updated_at']);
    await queryInterface.addIndex(tableName, ['created_at']);

    await queryInterface.addConstraint(tableName, {
      type: 'unique',
      name: `${tableName}_path_method_uk`,
      fields: ['path', 'method'],
    });

    await queryInterface.addConstraint(tableName, {
      type: 'check',
      where: { method: ['get', 'post', 'put', 'delete', 'patch'] },
      name: `${tableName}_method_ck`,
      fields: ['method'],
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(tableName, { cascade: true });
  },
};
