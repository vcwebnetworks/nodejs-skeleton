import { DataTypes } from 'sequelize';
import {
  Column,
  CreatedAt,
  Index,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import configTables from '@config/tables';

export type ResourceMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface ResourceDto {
  name: string;
  path: string;
  method: ResourceMethod;
}

@Table({
  tableName: configTables.resource,
  paranoid: false,
})
export class ResourceModel extends Model<ResourceModel, ResourceDto> {
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

  public static getValidMethod(): ResourceMethod[] {
    return ['get', 'post', 'put', 'delete', 'patch'];
  }
}
