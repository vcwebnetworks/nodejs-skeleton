import { RoleModel } from '@database/models';
import { RoleDto } from '@database/models/role';
import roleCheckExistNameService from '@modules/roles/services/check-exist-name';

class Create {
  public async run(payload: RoleDto): Promise<RoleModel> {
    await roleCheckExistNameService.run(payload.name);

    return RoleModel.create({
      name: payload.name,
      description: payload.description,
    });
  }
}

const roleCreateService = new Create();
export default roleCreateService;
