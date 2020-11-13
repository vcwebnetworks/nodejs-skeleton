import crypto from 'crypto';

import configApp from '@src/config/app';

class Encryption {
  private key: crypto.CipherKey;
  private algorithm = 'aes-256-cbc';

  constructor() {
    this.key = configApp.appKey;
  }

  public setKey(key: crypto.CipherKey): Encryption {
    this.key = key;

    return this;
  }

  public encrypt(payload: any): string {
    try {
      const iv = crypto.randomBytes(16);
      const key = this.getSecretKey();
      const cipher = crypto.createCipheriv(this.algorithm, key, iv);

      const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload)), cipher.final()]);

      const result = Buffer.from(
        JSON.stringify({
          iv: iv.toString('hex'),
          encrypted: encrypted.toString('hex'),
        }),
      );

      return result.toString('base64');
    } catch {
      throw new Error('The data could not be encrypted.');
    }
  }

  public decrypt(value: string): any {
    try {
      const key = this.getSecretKey();
      const { iv, encrypted } = this.getJsonPayload(value);
      const decipher = crypto.createDecipheriv(this.algorithm, key, iv);

      const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

      return JSON.parse(decrypted.toString());
    } catch {
      throw new Error('The data could not be decrypted.');
    }
  }

  private getJsonPayload(value: string): { iv: Buffer; encrypted: Buffer } {
    const payload = Buffer.from(value, 'base64');
    const { iv, encrypted } = JSON.parse(payload.toString());

    return {
      iv: Buffer.from(iv, 'hex'),
      encrypted: Buffer.from(encrypted, 'hex'),
    };
  }

  private getSecretKey(): string {
    const length = this.algorithm === 'aes-128-cbc' ? 16 : 32;

    return crypto.createHmac('sha256', this.key).digest('hex').substr(0, length);
  }
}

export default new Encryption();
