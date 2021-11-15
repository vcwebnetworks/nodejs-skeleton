import { BadRequestError } from '@/errors/bad-request';

import { Options } from './app';

export class InvalidParamError extends BadRequestError {
  constructor(options: Options) {
    super({ code: 'invalid_param', ...options });

    this.name = 'InvalidParamError';
  }
}
