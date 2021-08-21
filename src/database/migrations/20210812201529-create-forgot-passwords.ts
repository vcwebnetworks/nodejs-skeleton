import { DataTypes, literal, QueryInterface } from 'sequelize';

import configTables from '@config/tables';

const tableName = configTables.forgotPassword;

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
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          key: 'id',
          model: configTables.user,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      hash: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        defaultValue: literal('uuid_generate_v4()'),
      },
      validated_in: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      expired_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });

    await queryInterface.addIndex(tableName, ['id']);
    await queryInterface.addIndex(tableName, ['user_id']);
    await queryInterface.addIndex(tableName, ['hash'], { unique: true });
    await queryInterface.addIndex(tableName, ['expired_at']);
    await queryInterface.addIndex(tableName, ['validated_in']);
    await queryInterface.addIndex(tableName, ['created_at']);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(tableName, { cascade: true });
  },
};
