import configApp from '@config/app';

const dsn = process.env.SENTRY_DSN;

const configSentry = {
  dsn,
  enable: configApp.isProduction && dsn,
};

export default configSentry;
