import supertest from 'supertest';

import App from '@src/app';
import noCacheMiddleware from '@src/middlewares/NoCacheMiddleware';

describe('Middleware -> NoCacheMiddleware', () => {
  it('should return the configured headers', async () => {
    const express = App.getExpress();
    express.get('/no-cache', noCacheMiddleware, (_, response) => response.sendStatus(200));
    const response = await supertest(express).get('/no-cache');

    expect(response.status).toBe(200);
    expect(response.header.expires).toBe('0');
    expect(response.header.pragma).toBe('no-cache');
    expect(response.header['cache-control']).toBe('no-store, no-cache, must-revalidate, proxy-revalidate');
    expect(response.header['surrogate-control']).toBe('no-store');
  });
});
