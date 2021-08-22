import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';

import configApp from '@config/app';

export class Jwt {
  protected secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  public encode(payload: any, options?: SignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          sign(payload, this.secretKey, {
            expiresIn: '7d',
            ...options,
          }),
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  public decode<T = string>(
    token: string,
    options?: VerifyOptions,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        resolve(verify(token, this.secretKey, options) as T);
      } catch (err) {
        reject(err);
      }
    });
  }
}

const jwt = new Jwt(configApp.appKey);
export default jwt;
