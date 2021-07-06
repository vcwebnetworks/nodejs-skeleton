import { DataTypes, literal, QueryInterface } from 'sequelize';

const tableName = 'users_reset_passwords';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        unique: true,
        defaultValue: literal('(uuid())'),
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          key: 'id',
          model: 'users',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      code: {
        type: DataTypes.INTEGER({ length: 8 }),
        unique: true,
        allowNull: true,
        defaultValue: null,
      },
      hash: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: true,
        defaultValue: null,
      },
      expired_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });

    await queryInterface.addIndex(tableName, ['id']);
    await queryInterface.addIndex(tableName, ['code']);
    await queryInterface.addIndex(tableName, ['hash']);
    await queryInterface.addIndex(tableName, ['expired_at']);
    await queryInterface.addIndex(tableName, ['created_at']);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(tableName);
  },
};
