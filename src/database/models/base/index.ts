import { FindOptions } from 'sequelize';
import { Model, ModelStatic } from 'sequelize-typescript';

import { NotFoundError } from '@/errors';

export class BaseModel<
  TModelAttributes extends {} = any,
  TCreationAttributes extends {} = TModelAttributes,
> extends Model<TModelAttributes, TCreationAttributes> {
  public created_at?: Date;
  public updated_at?: Date;
  public deleted_at?: Date | null;

  public static findOrFail<M extends Model = Model>(
    this: ModelStatic<M>,
    options: FindOptions<M['_attributes']> & { message: string },
  ): Promise<M>;

  public static async findOrFail(
    options: FindOptions<Model['_attributes']> & { message: string },
  ): Promise<Model> {
    const result = await this.findOne({
      ...options,
      rejectOnEmpty: new NotFoundError({
        message: options.message,
        code: 'model:find_or_fail',
      }),
    });

    return result;
  }
}
