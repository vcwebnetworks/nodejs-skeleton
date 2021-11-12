const commonError = {
  type: 'object',
  required: ['*'],
  properties: {
    name: { type: 'string' },
    code: { type: 'string' },
    message: { type: 'string' },
    statusCode: { type: 'number' },
    errors: {
      type: 'array',
      required: false,
      items: {
        type: 'object',
        properties: {
          type: { type: 'string' },
          path: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
    stack: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};

export default commonError;
