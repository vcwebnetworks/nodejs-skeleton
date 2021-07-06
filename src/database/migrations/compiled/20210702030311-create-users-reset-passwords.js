"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

const tableName = 'users_reset_passwords';
var _default = {
  up: async queryInterface => {
    await queryInterface.createTable(tableName, {
      id: {
        type: _sequelize.DataTypes.STRING(36),
        primaryKey: true,
        unique: true,
        defaultValue: (0, _sequelize.literal)('(uuid())')
      },
      user_id: {
        type: _sequelize.DataTypes.STRING,
        allowNull: false,
        references: {
          key: 'id',
          model: 'users'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      code: {
        type: _sequelize.DataTypes.INTEGER({
          length: 8
        }),
        unique: true,
        allowNull: true,
        defaultValue: null
      },
      hash: {
        type: _sequelize.DataTypes.STRING(255),
        unique: true,
        allowNull: true,
        defaultValue: null
      },
      expired_at: {
        type: _sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      created_at: {
        type: _sequelize.DataTypes.DATE,
        defaultValue: (0, _sequelize.literal)('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
    await queryInterface.addIndex(tableName, ['id']);
    await queryInterface.addIndex(tableName, ['code']);
    await queryInterface.addIndex(tableName, ['hash']);
    await queryInterface.addIndex(tableName, ['expired_at']);
    await queryInterface.addIndex(tableName, ['created_at']);
  },
  down: async queryInterface => {
    await queryInterface.dropTable(tableName);
  }
};
exports.default = _default;