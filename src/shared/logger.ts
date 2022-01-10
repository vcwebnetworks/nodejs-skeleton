import { config, createLogger, format, transports } from 'winston';

const transportsList = [new transports.Console()];

const logger = createLogger({
  levels: config.syslog.levels,
  transports: transportsList,
  exceptionHandlers: transportsList,
  silent: process.env.NODE_ENV === 'test',
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.simple(),
  ),
});

export default logger;
