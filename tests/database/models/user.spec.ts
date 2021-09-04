import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import sequelize from '@src/database';

import { UserModel } from '@database/models';

const fakeUser = async () => UserModel.makeTestFake();

fdescribe('UserModel', () => {
  afterAll(() => sequelize.close());

  it('should create a new user with encrypted password.', async () => {
    const genSaltSpy = jest.spyOn(bcrypt, 'genSalt');
    const hashSpy = jest.spyOn(bcrypt, 'hash');

    const user = await fakeUser();

    expect(user.name).toBe('any_name');
    expect(user.email).toBe('any_email@mail.com');
    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(genSaltSpy).toHaveBeenCalledTimes(1);
  });

  it('should create a user and verify the encrypted password has valid.', async () => {
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    const user = await fakeUser();

    const verifyPassword = await user.verifyPassword('any_password');

    expect(verifyPassword).toBe(true);
    expect(compareSpy).toHaveBeenCalledWith('any_password', user.password);
  });

  it('should create a user and verify the encrypted password has invalid.', async () => {
    const compareSpy = jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(() => Promise.resolve(false));

    const user = await fakeUser();

    const verifyPassword = await user.verifyPassword('any_password');

    expect(verifyPassword).toBe(false);
    expect(compareSpy).toHaveBeenCalledWith('any_password', user.password);
  });

  it('should create a user and create a valid jwt token.', async () => {
    const user = await fakeUser();

    const signSty = jest
      .spyOn(jsonwebtoken, 'sign')
      .mockImplementationOnce(() => Promise.resolve('any_token'));

    const token = await user.generateJwtToken();

    expect(signSty).toHaveBeenCalledTimes(1);
    expect(token).toBe('any_token');
  });
});
