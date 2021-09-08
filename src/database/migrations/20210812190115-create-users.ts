import { DataTypes, literal, QueryInterface } from 'sequelize';

import configTables from '@config/tables';

const tableName = configTables.user;

export default {
  async up(queryInterface: QueryInterface) {
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
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
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
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'online',
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

    await queryInterface.addIndex(tableName, ['id']);
    await queryInterface.addIndex(tableName, ['email'], { unique: true });
    await queryInterface.addIndex(tableName, ['status']);
    await queryInterface.addIndex(tableName, ['created_at']);
    await queryInterface.addIndex(tableName, ['updated_at']);
    await queryInterface.addIndex(tableName, ['deleted_at']);

    await queryInterface.addConstraint(tableName, {
      type: 'check',
      fields: ['status'],
      name: `${tableName}_status_ck`,
      where: { status: ['online', 'offline'] },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(tableName, { cascade: true });
  },
};
