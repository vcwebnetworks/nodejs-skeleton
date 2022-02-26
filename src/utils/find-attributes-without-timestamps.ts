import { ProjectionAlias } from 'sequelize';

type Attributes = {
  include?: (string | ProjectionAlias)[];
  exclude?: string[];
};

export const findAttributesWithoutTimestamps = (attributes?: Attributes) => {
  const { exclude = [], include = [] } = attributes ?? {};

  return {
    exclude: ['created_at', 'updated_at', 'deleted_at', ...exclude],
    include,
  };
};
