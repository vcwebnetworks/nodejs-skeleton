import { Optional } from 'sequelize';
import {
  BeforeSave,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

import { BadRequestError } from '@errors/bad-request';

import { UserModel } from '@modules/users/models/user';

export interface IResetPasswordAttributes {
  id: string;
  user_id: string;
  code?: number | null;
  hash?: string | null;
  expired_at: Date | null;
  created_at?: Date;
}

export type ICreateResetPasswordDto = Optional<IResetPasswordAttributes, 'id'>;

@Table({
  tableName: 'users_reset_passwords',
  updatedAt: false,
  paranoid: false,
})
export class UserResetPasswordModel extends Model<
  IResetPasswordAttributes,
  ICreateResetPasswordDto
> {
  @Index
  @Column({
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  public id: string;

  @Index
  @Column
  @ForeignKey(() => UserModel)
  user_id: string;

  @Index
  @Column
  code: number;

  @Index
  @Column
  hash: string;

  @Index
  @Column
  public expired_at: Date;

  @Index
  @CreatedAt
  public created_at: Date;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @BeforeSave
  public static checkCodeAndHash(row: UserResetPasswordModel) {
    if ((!row.code && !row.hash) || (row.code && row.hash)) {
      throw new BadRequestError(
        'Dados inválidos ao salvar o pedido de recuperação de senha.',
      );
    }
  }
}
