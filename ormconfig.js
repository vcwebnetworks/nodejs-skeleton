require('dotenv').config();

const { format } = require('util');
const isDev = process.env.NODE_ENV === 'development';
const rootDir = isDev ? 'src' : 'dist';
const extension = isDev ? '.ts' : '.js';

module.exports = [
  {
    name: 'default',
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'dbname',
    logging: process.env.DB_LOGGING || true,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    entities: [format('./%s/database/models/*%s', rootDir, extension)],
    migrations: [format('./%s/database/migrations/*%s', rootDir, extension)],
    cli: {
      migrationsDir: format('./%s/database/migrations', rootDir),
    },
  },
];
