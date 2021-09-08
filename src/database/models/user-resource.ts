import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

import configTables from '@config/tables';

import { ResourceModel, UserModel } from './index';

export interface UserResourceDto {
  user_id: string;
  resource_id: string;
}

@Table({
  tableName: configTables.userResource,
  updatedAt: false,
  paranoid: false,
})
export class UserResourceModel extends Model<
  UserResourceModel,
  UserResourceDto
> {
  @Index
  @Column({
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  public id: string;

  @Column
  @Index
  @ForeignKey(() => UserModel)
  user_id: string;

  @Column
  @Index
  @ForeignKey(() => ResourceModel)
  resource_id: string;

  @Index
  @CreatedAt
  public readonly created_at: Date;

  @BelongsTo(() => UserModel)
  public user?: UserModel;

  @BelongsTo(() => ResourceModel)
  public resource?: ResourceModel;
}
