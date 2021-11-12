import { Model } from 'sequelize';

export const addValuesToModel = (
  model: Model,
  values: Record<string, any>,
  excludeTimestamps = true,
) => {
  if (!values) {
    return;
  }

  Object.entries(values).forEach(([column, value]) => {
    if (excludeTimestamps) {
      ['created_at', 'updated_at', 'deleted_at'].forEach(timestamp => {
        if (timestamp === column) {
          value = undefined;
        }
      });
    }

    if (
      value === '' ||
      value === null ||
      value?.toString()?.trim() !== 'undefined'
    ) {
      model.setDataValue<any>(column, value);
    }
  });
};
