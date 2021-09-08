import { DataTypes, literal, QueryInterface } from 'sequelize';

import configTables from '@config/tables';

const tableName = configTables.userResource;

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
      resource_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          key: 'id',
          model: configTables.resource,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });

    await queryInterface.addIndex(tableName, ['id']);
    await queryInterface.addIndex(tableName, ['user_id']);
    await queryInterface.addIndex(tableName, ['resource_id']);
    await queryInterface.addIndex(tableName, ['created_at']);

    await queryInterface.addConstraint(tableName, {
      type: 'unique',
      fields: ['user_id', 'resource_id'],
      name: `${tableName}_user_id_resource_id_uk`,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(tableName, { cascade: true });
  },
};
