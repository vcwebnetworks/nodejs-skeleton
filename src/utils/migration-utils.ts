import { DataTypes, literal, Model, ModelAttributes } from 'sequelize';

interface Params {
  mergeColumns: ModelAttributes<Model<any, any>, any>;
  softDelete?: boolean;
}

export const migrationAddDefaultColumns = ({
  softDelete = true,
  mergeColumns,
}: Params) => ({
  id: {
    type: DataTypes.UUID,
    unique: true,
    allowNull: false,
    primaryKey: true,
    defaultValue: literal('uuid_generate_v4()'),
  },
  ...mergeColumns,
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  ...(softDelete
    ? {
        deleted_at: {
          type: DataTypes.DATE,
          defaultValue: null,
          allowNull: true,
        },
      }
    : {}),
});
