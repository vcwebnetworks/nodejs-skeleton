import { DataTypes, literal, QueryInterface } from 'sequelize';

import configTables from '@config/tables';

const tableName = configTables.user;

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    );

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
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });

    await queryInterface.addIndex(tableName, ['id'], { unique: true });
    await queryInterface.addIndex(tableName, ['email'], { unique: true });
    await queryInterface.addIndex(tableName, ['created_at']);
    await queryInterface.addIndex(tableName, ['updated_at']);
    await queryInterface.addIndex(tableName, ['deleted_at']);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(tableName, { cascade: true });
  },
};
