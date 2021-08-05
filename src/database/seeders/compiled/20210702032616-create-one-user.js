"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passwordBcrypt = _interopRequireDefault(require("@shared/password-bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  up: async query => {
    await query.bulkInsert('users', [{
      name: 'User Name',
      email: 'user@example.com',
      password: await _passwordBcrypt.default.hash('mudar123@')
    }]);
  },
  down: async query => {
    await query.bulkDelete('users', {});
  }
};
exports.default = _default;