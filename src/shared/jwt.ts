import { Secret, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';

import configApp from '@config/app';

class Jwt {
  public encode(
    payload: any,
    secretKey?: Secret,
    options?: SignOptions,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        resolve(
          sign(payload, Jwt.getSecretKey(secretKey), {
            expiresIn: '7d',
            ...options,
          }),
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  public decode<T extends string>(
    token: string,
    secretKey?: Secret,
    options?: VerifyOptions,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        resolve(verify(token, Jwt.getSecretKey(secretKey), options) as T);
      } catch (err) {
        reject(err);
      }
    });
  }

  private static getSecretKey(secretKey?: Secret): Secret {
    return secretKey ?? configApp.appKey;
  }
}

const jwt = new Jwt();
export default jwt;
