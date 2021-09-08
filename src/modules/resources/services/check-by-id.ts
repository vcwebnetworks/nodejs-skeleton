import { Transaction } from 'sequelize';

import { InvalidParamError } from '@src/errors';

import { ResourceModel } from '@database/models';

class CheckById {
  public async run(
    id: string,
    transaction?: Transaction,
  ): Promise<ResourceModel> {
    const row = await ResourceModel.findOne({
      limit: 1,
      where: { id },
      transaction,
    });

    if (!row) {
      throw new InvalidParamError('Resource not exists.');
    }

    return row;
  }
}

const resourceCheckByIdService = new CheckById();
export default resourceCheckByIdService;
