import { config, createLogger, format, transports } from 'winston';

const transportsList = [new transports.Console()];

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.simple(),
  ),
  levels: config.syslog.levels,
  transports: transportsList,
  exceptionHandlers: transportsList,
  silent: process.env.NODE_ENV === 'test',
});

export default logger;
