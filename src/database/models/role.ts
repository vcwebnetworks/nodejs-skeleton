import { DataTypes } from 'sequelize';
import {
  Column,
  CreatedAt,
  HasMany,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

import configTables from '@config/tables';

import { RoleResourceModel, UserModel } from './index';

export type RoleDto = {
  name: string;
  description: string;
};

@Table({
  tableName: configTables.role,
  paranoid: false,
  updatedAt: false,
})
export class RoleModel extends Model<RoleModel, RoleDto> {
  @Index
  @Column({
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  public id: string;

  @Column
  public name: string;

  @Column
  public description: string;

  @Index
  @CreatedAt
  public readonly created_at: Date;

  @HasMany(() => UserModel)
  public users?: UserModel[];

  @HasMany(() => RoleResourceModel)
  public resources?: RoleResourceModel[];
}
