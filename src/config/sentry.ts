const dsn = process.env.SENTRY_DSN;

const configSentry = {
  dsn,
  enable: process.env.NODE_ENV === 'production' && dsn,
};

export default configSentry;
