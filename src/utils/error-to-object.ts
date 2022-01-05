import { ValidationError as YupValidationError } from 'yup';

import { HttpStatusCode } from '@/enums';
import logger from '@/shared/logger';

interface ValidatorError {
  type: string;
  path: string;
  message: string;
}

interface Metadata {
  [key: string]: any;

  validators: ValidatorError[];
}

interface Response {
  code: string;
  name: string;
  message: string;
  stack?: string[];
  statusCode: number;
  description?: string;
  metadata: Metadata;
  originalError?: any;
}

const mapperValidationError = (item: any): ValidatorError => ({
  type: item.type,
  path: item.path,
  message: item.message,
});

export const errorToObject = (error: any): Response => {
  let message = error?.message;
  let isInternalServerError = error?.name === 'InternalServerError';
  let statusCode = error?.statusCode ?? HttpStatusCode.BAD_REQUEST;
  let validators: ValidatorError[] | undefined;
  const metadata = error?.metadata ?? {};

  if (error instanceof YupValidationError) {
    message = error.errors[0] ?? message;
    validators = error.inner.map(mapperValidationError);
  }

  if (error?.name?.startsWith('Sequelize')) {
    message = 'Internal Server Error';
    error.name = message.replace(/\s/g, '');
    validators = error?.errors?.map(mapperValidationError);
    isInternalServerError = true;
  }

  if (isInternalServerError) {
    logger.error('original error ->', error);

    statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;

    error.stack = null;
  }

  return {
    name: error.name,
    statusCode,
    code: error?.code ?? 'default',
    message: message ?? error,
    stack: error?.stack?.split('\n'),
    description: error?.description,
    originalError: error?.originalError,
    metadata: { validators, ...metadata },
  };
};
