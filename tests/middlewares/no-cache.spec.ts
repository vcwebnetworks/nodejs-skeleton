import express from 'express';
import supertest from 'supertest';

import { noCacheMiddleware } from '@/middlewares/no-cache';

import { HttpStatusCode } from '../../src/enums';

describe('Middleware: no-cache', () => {
  it('should return the settings without cache in the response', async () => {
    const app = express();
    app.get('/no-cache', noCacheMiddleware, (_, r) => r.sendStatus(200));

    const response = await supertest(app).get('/no-cache');

    expect(response.status).toBe(HttpStatusCode.OK);
    expect(response.header.expires).toBe('0');
    expect(response.header.pragma).toBe('no-cache');
    expect(response.header['cache-control']).toBe(
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    expect(response.header['surrogate-control']).toBe('no-store');
  });
});
