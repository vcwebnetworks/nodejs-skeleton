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
  if (
    process.env.NODE_ENV === 'production' ||
    error?.name?.startsWith('Sequelize')
  ) {
    logger.error('original error information ->', error);
  }

  let message = error?.message;
  let statusCode = error?.statusCode ?? HttpStatusCode.BAD_REQUEST;
  let validators: ValidatorError[] | undefined;

  const metadata = error?.metadata ?? {};

  if (error instanceof YupValidationError) {
    message = error.errors[0] ?? message;
    validators = error.inner.map(mapperValidationError);
  }

  if (error?.name?.startsWith('Sequelize')) {
    message = 'Internal Server Error';
    validators = error?.errors?.map(mapperValidationError);
    statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;

    error.name = message.replace(/\s/g, '');
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
