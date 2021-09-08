import { DataTypes } from 'sequelize';
import {
  BeforeSave,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasMany,
  Index,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import configTables from '@config/tables';
import jwt from '@shared/jwt';
import passwordBcrypt from '@shared/password-bcrypt';

import { RoleModel, UserResourceModel } from './index';

export type UserStatus = 'online' | 'offline';

export interface UserDto {
  role_id: string;
  name: string;
  email: string;
  status: UserStatus;
  password: string;
}

@Table({ tableName: configTables.user })
export class UserModel extends Model<UserModel, UserDto> {
  @Index
  @Column({
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  public id: string;

  @Index
  @Column
  @ForeignKey(() => RoleModel)
  public role_id: string;

  @Index
  @Column
  public name: string;

  @Index({ unique: true })
  @Column
  public email: string;

  @Index
  @Column({
    type: DataTypes.STRING,
  })
  public status: UserStatus;

  @Column
  public password: string;

  @Index
  @CreatedAt
  public readonly created_at: Date;

  @Index
  @UpdatedAt
  public readonly updated_at: Date;

  @Index
  @DeletedAt
  public deleted_at: Date;

  @HasMany(() => UserResourceModel)
  public resources?: UserResourceModel[];

  @BelongsTo(() => RoleModel)
  public role?: RoleModel;

  @BeforeSave
  public static async hashedPassword(row: UserModel) {
    if (row.changed('password')) {
      row.password = await passwordBcrypt.hash(row.password);
    }
  }

  public static getValidStatus(): UserStatus[] {
    return ['online', 'offline'];
  }

  public async verifyPassword(password: any): Promise<boolean> {
    return passwordBcrypt.verify(password, this.password);
  }

  public async generateJwtToken(): Promise<string> {
    return jwt.encode({ sub: this.id });
  }
}
