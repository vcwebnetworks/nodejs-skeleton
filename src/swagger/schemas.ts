import swaggerSchemasUser from '@/swagger/schemas/user';

import commonError from './schemas/common/error';

const swaggerSchemas = {
  common: {
    error: commonError,
  },

  user: swaggerSchemasUser,
};

export default swaggerSchemas;
