import { BadRequestError } from '@errors/bad-request';

export default class InvalidParamError extends BadRequestError {
  constructor(message: string) {
    super(message);

    this.name = 'InvalidParamError';
    this.code = 'invalid_param';
  }
}
