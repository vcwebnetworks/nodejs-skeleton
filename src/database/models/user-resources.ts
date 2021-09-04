import { DataTypes, Optional } from 'sequelize';
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

import { ResourceModel, UserModel } from '.';

export interface UserResourceAttributes {
  id: string;
  user_id: string;
  resource_id: string;
  created_at: Date;
}

export type UserResourceDto = Optional<UserResourceAttributes, 'id'>;

@Table({
  tableName: configTables.userResource,
  timestamps: false,
  paranoid: false,
})
export class UserResourceModel extends Model<
  UserResourceAttributes,
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

  @BelongsTo(() => ResourceModel)
  public resource?: ResourceModel;
}
