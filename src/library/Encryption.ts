import crypto from 'crypto';

import configApp from '../config/app';

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
      const key = this.generateKey(iv);
      const cipher = crypto.createCipheriv(this.algorithm, key, iv);

      const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(payload)),
        cipher.final(),
      ]).toString('hex');

      const result = Buffer.from(
        JSON.stringify({ iv: iv.toString('hex'), encrypted }),
      );

      return result.toString('base64');
    } catch (e) {
      throw new Error('"Encryption.encrypt": The data could not be encrypted.');
    }
  }

  public decrypt(encrypted: string): any {
    try {
      const payload = this.getPayloadJson(encrypted);
      const key = this.generateKey(payload.iv);
      const decipher = crypto.createDecipheriv(this.algorithm, key, payload.iv);

      const decrypted = Buffer.concat([
        decipher.update(payload.encrypted),
        decipher.final(),
      ]).toString();

      return JSON.parse(decrypted);
    } catch {
      throw new Error('"Encryption.encrypt": The data could not be decrypted.');
    }
  }

  private getPayloadJson(value: string): { iv: Buffer; encrypted: Buffer } {
    const payload = Buffer.from(value, 'base64');
    const { iv, encrypted } = JSON.parse(payload.toString());

    return {
      iv: Buffer.from(iv, 'hex'),
      encrypted: Buffer.from(encrypted, 'hex'),
    };
  }

  private generateKey(salt: Buffer): Buffer {
    return crypto.scryptSync(this.key as crypto.BinaryLike, salt, 32);
  }
}

export default new Encryption();
