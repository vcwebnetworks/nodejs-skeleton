import { Optional } from 'sequelize';
import {
  BeforeSave,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Index,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import jwt from '@shared/jwt';
import passwordBcrypt from '@shared/password-bcrypt';

export interface IUserAttributes {
  id: string;
  name: string;
  email: string;
  password: string | undefined;
  created_at?: Date;
  readonly updated_at?: Date;
  deleted_at?: Date;
}

export type ICreateUserDto = Optional<IUserAttributes, 'id'>;

@Table({ tableName: 'users' })
export class UserModel extends Model<IUserAttributes, ICreateUserDto> {
  @Index
  @Column({
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  public id: string;

  @Index
  @Column
  public name: string;

  @Index({ unique: true })
  @Column({ unique: true })
  public email: string;

  @Column
  public password: string;

  @Index
  @CreatedAt
  public created_at: Date;

  @Index
  @UpdatedAt
  public updated_at: Date;

  @Index
  @DeletedAt
  public deleted_at: Date;

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
