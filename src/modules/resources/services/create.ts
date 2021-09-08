import { ResourceModel } from '@database/models';
import { ResourceDto } from '@database/models/resource';
import resourceCheckExistPathMethodService from '@modules/resources/services/check-exits-path-method';

class Create {
  public async run(payload: ResourceDto): Promise<ResourceModel> {
    await resourceCheckExistPathMethodService.run(payload.path, payload.method);

    return ResourceModel.create({
      name: payload.name,
      path: payload.path,
      method: payload.method,
    });
  }
}

const resourceCreateService = new Create();
export default resourceCreateService;
