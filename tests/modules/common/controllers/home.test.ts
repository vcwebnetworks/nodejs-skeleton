import { makeAppSupertest } from '@tests/utils';

import app from '@src/server/app';

describe('Common -> IndexController', () => {
  afterAll(() => app.close());

  it('should return status 200 in the request', async () => {
    const response = await makeAppSupertest().get('/');

    expect(response.status).toBe(200);
  });
});
