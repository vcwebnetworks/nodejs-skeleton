import { Model } from 'sequelize-typescript';

export class BaseModel<
  TModelAttributes extends {} = any,
  TCreationAttributes extends {} = TModelAttributes,
> extends Model<TModelAttributes, TCreationAttributes> {
  public created_at?: Date;
  public updated_at?: Date;
  public deleted_at?: Date | null;
}
