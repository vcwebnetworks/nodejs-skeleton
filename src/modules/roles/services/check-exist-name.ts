import { ConflictError } from '@src/errors';

import { RoleModel } from '@database/models';

class CheckNameMail {
  public async run(name: string): Promise<void> {
    const rowExist = await RoleModel.findOne({
      where: { name },
    });

    if (rowExist) {
      throw new ConflictError(
        'A function with the entered name already exists.',
      );
    }
  }
}

const roleCheckExistNameService = new CheckNameMail();
export default roleCheckExistNameService;
