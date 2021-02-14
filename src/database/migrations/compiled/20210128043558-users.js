"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

class CreateTableUsers {
  async up(queryInterface, dataTypes) {
    const dialect = queryInterface.sequelize.getDialect();
    await queryInterface.createTable('users', {
      id: {
        type: dataTypes.STRING(36),
        primaryKey: true,
        unique: true,
        defaultValue: (0, _sequelize.literal)('(uuid())')
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false
      },
      email: {
        type: dataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: dataTypes.DATE,
        defaultValue: (0, _sequelize.literal)('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: dataTypes.DATE,
        defaultValue: (0, _sequelize.literal)(`CURRENT_TIMESTAMP${dialect !== 'sqlite' && ' ON UPDATE CURRENT_TIMESTAMP'}`),
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
  }

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }

}

var _default = new CreateTableUsers();

exports.default = _default;