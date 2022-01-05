import {
  DataTypes,
  literal,
  Model,
  ModelAttributes,
  QueryInterface,
} from 'sequelize';

import { Tables } from '@/enums';

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

export const migrationAddDefaultIndexes = async ({
  tableName,
  queryInterface,
  softDelete = true,
}: {
  tableName: Tables;
  queryInterface: QueryInterface;
  softDelete?: boolean;
}) => {
  await queryInterface.addIndex(tableName, ['id']);
  await queryInterface.addIndex(tableName, ['created_at']);
  await queryInterface.addIndex(tableName, ['updated_at']);

  if (softDelete) {
    await queryInterface.addIndex(tableName, ['deleted_at']);
  }
};
