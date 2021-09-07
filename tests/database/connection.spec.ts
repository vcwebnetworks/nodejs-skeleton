import sequelize from '@src/database';

describe('Database', () => {
  it('should verify that the connection was successful.', async () => {
    await expect(sequelize.authenticate()).resolves.toBe(undefined);
  });

  it('should verify that the connection has failed..', async () => {
    jest
      .spyOn(sequelize, 'authenticate')
      .mockImplementationOnce(() =>
        Promise.reject(new Error('failed connection.')),
      );

    await expect(sequelize.authenticate()).rejects.toThrow(
      'failed connection.',
    );
  });
});
