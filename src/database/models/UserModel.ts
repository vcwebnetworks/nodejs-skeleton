import { BeforeSave, Column, CreatedAt, DataType, Index, Model, Table, UpdatedAt } from 'sequelize-typescript';

import Password from '@src/helpers/Password';

@Table({ tableName: 'users' })
export class UserModel extends Model {
  @Index
  @Column({ primaryKey: true, defaultValue: DataType.UUIDV4, unique: true })
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

  @BeforeSave
  static async hashedPassword(row: UserModel) {
    if (row.changed('password')) {
      row.password = await Password.hash(row.password);
    }
  }
}
