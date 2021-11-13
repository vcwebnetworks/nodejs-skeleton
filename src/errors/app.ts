import { HttpStatusCode } from '@src/enums';

export interface Options {
  code?: string;
  message: string;
  description?: string;
  metadata?: Record<string, any>;
  statusCode?: HttpStatusCode;
  originalError?: Error;
}

export class AppError extends Error {
  constructor(options: Options) {
    super(options.message);

    Object.setPrototypeOf(this, AppError.prototype);

    const {
      code = 'default',
      description = null,
      metadata,
      originalError,
      statusCode = HttpStatusCode.BAD_REQUEST,
    } = options;

    this.name = 'AppError';

    this.defineProperty('code', code);
    this.defineProperty('metadata', metadata);
    this.defineProperty('statusCode', statusCode);
    this.defineProperty('description', description);
    this.defineProperty('originalError', originalError);

    Error.captureStackTrace(this, this.constructor);
  }

  protected defineProperty(key: string, value: any) {
    Object.defineProperty(this, key, {
      writable: false,
      value,
    });
  }
}
