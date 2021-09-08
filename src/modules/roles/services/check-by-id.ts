import { Transaction } from 'sequelize';

import { InvalidParamError } from '@src/errors';

import { RoleModel } from '@database/models';

class CheckById {
  public async run(id: string, transaction?: Transaction): Promise<RoleModel> {
    const rowRole = await RoleModel.findOne({
      limit: 1,
      where: { id },
      transaction,
    });

    if (!rowRole) {
      throw new InvalidParamError('Role not exists.');
    }

    return rowRole;
  }
}

const roleCheckByIdService = new CheckById();
export default roleCheckByIdService;
