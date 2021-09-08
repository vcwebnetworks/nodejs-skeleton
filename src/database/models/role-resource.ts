import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

import configTables from '@config/tables';

import { ResourceModel, RoleModel } from './index';

export interface RoleResourceDto {
  id: string;
  role_id: string;
  resource_id: string;
}

@Table({
  tableName: configTables.roleResource,
  timestamps: false,
  paranoid: false,
})
export class RoleResourceModel extends Model<
  RoleResourceModel,
  RoleResourceDto
> {
  @Index
  @Column({
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  public id: string;

  @Column
  @Index
  @ForeignKey(() => RoleModel)
  role_id: string;

  @Column
  @Index
  @ForeignKey(() => ResourceModel)
  resource_id: string;

  @BelongsTo(() => RoleModel)
  public role?: RoleModel;

  @BelongsTo(() => ResourceModel)
  public resource?: ResourceModel;
}
