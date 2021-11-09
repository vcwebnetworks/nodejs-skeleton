import { HttpStatusCode } from '@src/enums';

export default class AppError extends Error {
  constructor(
    public message: string,
    public statusCode = HttpStatusCode.BAD_REQUEST,
    public code = 'default',
  ) {
    super(message);

    Object.setPrototypeOf(this, AppError.prototype);

    this.code = code;
    this.name = 'AppError';
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
