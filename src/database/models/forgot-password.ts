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

import { UserModel } from '@database/models/user';

export interface ForgotPasswordAttributes {
  id: string;
  user_id: string;
  hash: string;
  expired_at: Date;
  created_at: Date;
  validated_in: Date | null;
}

export type ForgotPasswordDto = Optional<
  Omit<ForgotPasswordAttributes, 'id'>,
  'created_at' | 'hash' | 'validated_in'
>;

@Table({
  tableName: configTables.forgotPassword,
  updatedAt: false,
  paranoid: false,
})
export class ForgotPasswordModel extends Model<
  ForgotPasswordAttributes,
  ForgotPasswordDto
> {
  @Index
  @Column({
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  public id: string;

  @Index
  @Column
  @ForeignKey(() => UserModel)
  user_id: string;

  @Index
  @Column({
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  })
  hash: string;

  @Index
  @Column
  public validated_in: Date;

  @Index
  @Column
  public expired_at: Date;

  @Index
  @CreatedAt
  public created_at: Date;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
