import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

const uploadDir =
  process.env.UPLOAD_PATH ?? path.resolve(__dirname, '..', 'uploads');

const configApp = {
  appKey: process.env.APP_KEY ?? 'app:key',
  apiKey: process.env.API_KEY ?? 'api:key',

  isDevelopment,
  isProduction: !isDevelopment,

  locale: process.env.LOCALE ?? 'pt_BR',
  timezone: process.env.TZ ?? 'America/Sao_Paulo',

  debugNamespace: 'app',

  enableUpload: true,
  uploadDir,
} as const;

export default configApp;
