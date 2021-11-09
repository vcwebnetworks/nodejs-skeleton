import { RequestHandler } from 'express';

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head';

export interface Route {
  path: string | [Method, string];
  method?: Method;
  handler: RequestHandler;
  middlewares?: RequestHandler[];
  admin?: boolean;
  auth?: boolean;
}
