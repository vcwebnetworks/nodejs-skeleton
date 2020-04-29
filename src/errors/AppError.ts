export default class AppError extends Error {
  constructor(public message: string, public statusCode = 400) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}
