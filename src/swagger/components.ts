import swaggerComponentsErrorsBadRequest from '@src/swagger/components/errors/badRequest';
import swaggerComponentsErrorsForbidden from '@src/swagger/components/errors/forbidden';
import swaggerComponentsErrorsNotFound from '@src/swagger/components/errors/notFound';
import swaggerComponentsErrorsServerError from '@src/swagger/components/errors/serverError';
import swaggerComponentsErrorsUnauthorized from '@src/swagger/components/errors/unauthorized';

const swaggerComponents = {
  errors: {
    'not-found': swaggerComponentsErrorsNotFound,
    'bad-request': swaggerComponentsErrorsBadRequest,
    'server-error': swaggerComponentsErrorsServerError,
    forbidden: swaggerComponentsErrorsForbidden,
    unauthorized: swaggerComponentsErrorsUnauthorized,
  },

  securitySchemes: {
    bearerAuth: {
      in: 'header',
      type: 'http',
      scheme: 'bearer',
      description: 'Token de autorização.',
    },
  },
};

export default swaggerComponents;
