import { DataTypes, Optional } from 'sequelize';
import {
  BeforeSave,
  Column,
  CreatedAt,
  DeletedAt,
  HasMany,
  Index,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import configTables from '@config/tables';
import jwt from '@shared/jwt';
import passwordBcrypt from '@shared/password-bcrypt';

import { UserResourceModel } from '.';

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password?: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  deleted_at?: Date;
}

export type UserDto = Optional<
  Omit<UserAttributes, 'id'>,
  'created_at' | 'updated_at'
>;

@Table({ tableName: configTables.user })
export class UserModel extends Model<UserAttributes, UserDto> {
  @Index
  @Column({
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  })
  public id: string;

  @Index
  @Column
  public name: string;

  @Index({ unique: true })
  @Column
  public email: string;

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

  @BeforeSave
  static async hashedPassword(row: UserModel) {
    if (row.changed('password')) {
      row.password = await passwordBcrypt.hash(row.password);
    }
  }

  async verifyPassword(password: any): Promise<boolean> {
    return passwordBcrypt.verify(password, this.password);
  }

  async generateJwtToken(): Promise<string> {
    return jwt.encode({ sub: this.id });
  }

  static async makeTestFake(): Promise<UserModel> {
    await this.sync({ force: true });

    return this.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  }
}
