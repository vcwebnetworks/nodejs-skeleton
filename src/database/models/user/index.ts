import { DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

import { Tables } from '@/enums';

import { BaseModel } from '../base';
import { User, UserDto } from './types';

@Table({ tableName: Tables.USER })
export class UserModel extends BaseModel<User, UserDto> {
  @Column({ type: DataTypes.STRING })
  public name: User['name'];

  @Column({ type: DataTypes.STRING })
  public email: User['email'];

  @Column({ type: DataTypes.STRING })
  public password: User['password'];
}
