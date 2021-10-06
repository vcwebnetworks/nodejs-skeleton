import database from '@src/database';

describe('Database', () => {
  it('should verify that the connection was successful.', async () => {
    await expect(database.authenticate()).resolves.toBe(undefined);
  });

  it('should verify that the connection has failed..', async () => {
    jest
      .spyOn(database, 'authenticate')
      .mockImplementationOnce(() =>
        Promise.reject(new Error('failed connection.')),
      );

    await expect(database.authenticate()).rejects.toThrow('failed connection.');
  });
});
