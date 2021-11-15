import { Column, Table } from 'sequelize-typescript';

import configTables from '@/config/tables';

import { BaseModel } from '../base';
import { User, UserDto } from './types';

@Table({ tableName: configTables.user })
export class UserModel extends BaseModel<User, UserDto> {
  @Column
  public name: string;

  @Column
  public email: string;

  @Column
  public password: string;
}
