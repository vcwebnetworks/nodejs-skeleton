import { DataTypes, literal, QueryInterface } from 'sequelize';

import configTables from '@config/tables';

const tableName = configTables.roleResource;

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
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          key: 'id',
          model: configTables.role,
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });

    await queryInterface.addIndex(tableName, ['role_id']);
    await queryInterface.addIndex(tableName, ['resource_id']);

    await queryInterface.addConstraint(tableName, {
      type: 'unique',
      name: `${tableName}_role_id_resource_id_uk`,
      fields: ['role_id', 'resource_id'],
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(tableName, { cascade: true });
  },
};
