const isDevelopment = ['development', 'test'].includes(
  `${process.env.NODE_ENV}`,
);

const configApp = {
  appKey: process.env.APP_KEY ?? 'app:key',
  apiKey: process.env.API_KEY ?? 'api:key',

  isDevelopment,
  isProduction: !isDevelopment,

  locale: process.env.LOCALE ?? 'pt-br',
  timezone: process.env.TZ ?? 'America/Sao_Paulo',

  debugNamespace: 'app',
} as const;

export default configApp;
