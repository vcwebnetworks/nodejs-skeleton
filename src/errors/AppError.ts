export default class AppError {
  public name: string;

  constructor(public message: string, public statusCode = 400) {
    this.name = 'AppError';
    this.message = message;
    this.statusCode = statusCode;
  }
}
