const swaggerComponentsErrorsDefault = {
  description: 'Unauthorized',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/common/error',
      },
    },
  },
};

export default swaggerComponentsErrorsDefault;
