"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class CreateTableUsers {
  async up(queryInterface) {
    await queryInterface.createTable('users', {
      id: {
        type: _sequelize.DataTypes.STRING(36),
        primaryKey: true,
        unique: true,
        defaultValue: (0, _sequelize.literal)('(uuid())')
      },
      name: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: _sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false
      },
      deleted_at: {
        type: _sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      created_at: {
        type: _sequelize.DataTypes.DATE,
        defaultValue: (0, _sequelize.literal)('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: _sequelize.DataTypes.DATE,
        defaultValue: (0, _sequelize.literal)('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
    await queryInterface.addIndex('users', ['id'], {
      unique: true
    });
    await queryInterface.addIndex('users', ['email'], {
      unique: true
    });
    await queryInterface.addIndex('users', ['created_at']);
    await queryInterface.addIndex('users', ['updated_at']);
    await queryInterface.addIndex('users', ['deleted_at']);
  }

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }

}

var _default = new CreateTableUsers();

exports.default = _default;