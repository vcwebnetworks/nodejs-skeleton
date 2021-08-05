import { DataTypes, literal, QueryInterface } from 'sequelize';

class CreateTableUsers {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        unique: true,
        defaultValue: literal('(uuid())'),
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

    await queryInterface.addIndex('users', ['id'], { unique: true });
    await queryInterface.addIndex('users', ['email'], { unique: true });
    await queryInterface.addIndex('users', ['created_at']);
    await queryInterface.addIndex('users', ['updated_at']);
    await queryInterface.addIndex('users', ['deleted_at']);
  }

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('users');
  }
}

export default new CreateTableUsers();
