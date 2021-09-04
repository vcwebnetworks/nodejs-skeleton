import { DataTypes, Optional } from 'sequelize';
import {
  Column,
  CreatedAt,
  Index,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import configTables from '@config/tables';

export type ResourceMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'head';

export interface ResourceAttributes {
  id: string;
  name: string;
  path: string;
  method: ResourceMethod;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export type ResourceDto = Optional<
  Omit<ResourceAttributes, 'id'>,
  'created_at' | 'updated_at'
>;

@Table({
  tableName: configTables.resource,
  paranoid: false,
})
export class ResourceModel extends Model<ResourceAttributes, ResourceDto> {
  @Index
  @Column({
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  public id: string;

  @Column
  public name: string;

  @Index
  @Column
  public path: string;

  @Index
  @Column({
    type: DataTypes.STRING,
  })
  public method: ResourceMethod;

  @Index
  @UpdatedAt
  public readonly updated_at: Date;

  @Index
  @CreatedAt
  public readonly created_at: Date;
}
