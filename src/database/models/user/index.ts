import { DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

import configTables from '@/config/tables';

import { BaseModel } from '../base';
import { User, UserDto } from './types';

@Table({ tableName: configTables.user })
export class UserModel extends BaseModel<User, UserDto> {
  @Column({ type: DataTypes.STRING })
  public name: UserDto['name'];

  @Column({ type: DataTypes.STRING })
  public email: UserDto['email'];

  @Column({ type: DataTypes.STRING })
  public password: UserDto['password'];
}
