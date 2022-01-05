if (process.env.NODE_ENV !== 'test') {
  ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'].forEach(key => {
    if (!process.env[key]) {
      throw new Error(`Missing ${key} in environment variables`);
    }
  });
}

if (process.env.NODE_ENV === 'test' && !process.env.DB_URI) {
  ['DB_TYPE', 'DB_STORAGE'].forEach(key => {
    if (!process.env[key]) {
      throw new Error(`Missing ${key} in environment variables`);
    }
  });
}

const charset = process.env.DB_ENCODING || 'utf8';

const sequelizeOptions = {
  dialect: process.env.DB_TYPE ?? 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  storage: process.env.DB_STORAGE ?? null,
  timezone: process.env.DB_TIMEZONE ?? '+00:00',
  migrationStorageTableName: process.env.DB_MIGRATION_NAME ?? 'migrations',
  encoding: charset,
  define: {
    charset: process.env.DB_CHARSET ?? 'utf8',
    collate: process.env.DB_COLLATE ?? 'utf8_general_ci',
  },
};

module.exports = sequelizeOptions;
