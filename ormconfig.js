require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';
const rootDir = isDev ? 'src' : 'dist';

module.exports = [
  {
    name: 'default',
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'development',
    logging: process.env.DB_LOGGING || true,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    entities: [`${rootDir}/database/entities/*{.js,.ts}`],
    migrations: [`${rootDir}/database/migrations/*{.js,.ts}`],
    cli: {
      migrationsDir: `${rootDir}/database/migrations`,
    },
  },
];
