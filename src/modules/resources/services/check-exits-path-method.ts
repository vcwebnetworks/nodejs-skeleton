import { ConflictError } from '@src/errors';

import { ResourceModel } from '@database/models';

class CheckExitsPathMethod {
  public async run(path: string, method: string): Promise<void> {
    const rowExist = await ResourceModel.findOne({
      where: { path: path.toLowerCase(), method: method.toLowerCase() },
    });

    if (rowExist) {
      throw new ConflictError(
        `The resource ([${rowExist.method}] ${rowExist.path}) already exists.`,
      );
    }
  }
}

const resourceCheckExistPathMethodService = new CheckExitsPathMethod();
export default resourceCheckExistPathMethodService;
