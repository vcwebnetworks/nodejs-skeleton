import { ConflictError } from '@src/errors';

import { UserModel } from '@database/models';

class CheckExistMail {
  public async run(email: string): Promise<void> {
    const rowExistEmail = await UserModel.findOne({
      where: { email },
    });

    if (rowExistEmail) {
      throw new ConflictError('E-mail informado já existe em nosso sistema.');
    }
  }
}

const userCheckExistMailService = new CheckExistMail();
export default userCheckExistMailService;
