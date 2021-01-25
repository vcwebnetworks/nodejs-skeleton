import swaggerComponentsErrorsDefault from './components/errors/default';
import swaggerComponentsErrorsNotFound from './components/errors/notFound';

const swaggerComponents = {
  errors: {
    default: swaggerComponentsErrorsDefault,
    'not-found': swaggerComponentsErrorsNotFound,
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
