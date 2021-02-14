const sequelizeOptions = {
  dialect: String(process.env.DB_TYPE ?? 'mysql'),
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'development',
  storage: process.env.DB_STORAGE ?? null,
  timezone: process.env.DB_TIMEZONE ?? 'America/Sao_Paulo',
  migrationStorageTableName: process.env.DB_MIGRATION_NAME ?? 'migrations',
  define: {
    engine: 'InnoDB',
    timestamps: true,
    underscored: true,
    charset: process.env.DB_CHARSET ?? 'utf8mb4',
    collate: process.env.DB_COLLATE ?? 'utf8mb4_general_ci',
  },
};

module.exports = sequelizeOptions;
