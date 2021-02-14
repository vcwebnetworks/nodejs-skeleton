import sequelize from '@src/database';
import { UserModel } from '@src/database/models/UserModel';
import Password from '@src/helpers/Password';

const fakeUser = async () =>
  UserModel.create({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
  });

describe('UserModel', () => {
  afterAll(() => sequelize.close());
  beforeEach(() => sequelize.sync({ force: true }));

  it('should create a new user', async () => {
    const user = await fakeUser();

    expect(user.name).toBe('any_name');
    expect(user.email).toBe('any_email@mail.com');
    expect(user.password).toMatch(/^\$2a\$12\$.+/g);
  });

  it('should create a new user with the encrypted password.', async () => {
    const user = await fakeUser();

    expect(await Password.verify('any_password', user.password)).toBe(true);
  });
});
