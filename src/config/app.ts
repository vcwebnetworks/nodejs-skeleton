const configApp = {
  appKey: process.env.APP_KEY ?? 'app:key',
  apiKey: process.env.API_KEY ?? 'api:key',

  startServerCheckEnvironment: process.env.CHECK_ENV_FILE === 'true' || process.env.NODE_ENV === 'development',
};

export default configApp;
