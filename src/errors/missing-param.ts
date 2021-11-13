import { BadRequestError } from '@errors/bad-request';

import { Options } from './app';

export class MissingParamError extends BadRequestError {
  constructor(options: Options) {
    super({ code: 'missing_param', ...options });

    this.name = 'MissingParamError';
  }
}
