import { createLogger, format, Logger as WinstonLogger, transports } from 'winston';

interface ILogRequest {
  level: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
  message: string;
  metadata?: Record<string, any>;
}

class Logger {
  private logger: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      format: format.combine(format.colorize(), format.simple()),
      transports: [new transports.Console({ level: 'info' })],
    });
  }

  public run({ level = 'info', message, metadata }: ILogRequest) {
    this.logger.log(level, message, metadata);
  }
}

export default new Logger();
