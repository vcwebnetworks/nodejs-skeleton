import { BadRequestError } from '@errors/bad-request';

export class MissingParamError extends BadRequestError {
  constructor(message: string) {
    super(message);

    this.name = 'MissingParamError';
    this.code = 'missing_param';
  }
}
