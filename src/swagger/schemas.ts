import swaggerSchemasUser from '@src/swagger/schemas/user';

import swaggerSchemasCommonError from './schemas/common/error';

const swaggerSchemas = {
  common: {
    error: swaggerSchemasCommonError,
  },

  user: swaggerSchemasUser,
};

export default swaggerSchemas;
