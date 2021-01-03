import crypto from 'crypto';

import configApp from '@src/config/app';

class Encryption {
  private readonly key: crypto.BinaryLike;
  private algorithm = 'aes-256-gcm';
  private length = 32;

  constructor() {
    this.key = configApp.appKey;
  }

  public encrypt(payload: any): string {
    const iv = crypto.randomBytes(16);
    const salt = crypto.randomBytes(64);
    const key = this.generateSecretKey(salt);
    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload)), cipher.final()]);
    const authTag = (<any>cipher).getAuthTag();

    const result = Buffer.from(
      JSON.stringify({
        iv: iv.toString('hex'),
        salt: salt.toString('hex'),
        encrypted: encrypted.toString('hex'),
        authTag: (<Buffer>authTag).toString('hex'),
      }),
    );

    return result.toString('base64');
  }

  public decrypt(value: string): any {
    const { iv, encrypted, salt, authTag } = Encryption.getPayload(value);
    const key = this.generateSecretKey(salt);
    const decipher = crypto.createDecipheriv(this.algorithm, key, iv);

    (<any>decipher).setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    return JSON.parse(decrypted.toString());
  }

  private static getPayload(value: string): { iv: Buffer; encrypted: Buffer; salt: Buffer; authTag: Buffer } {
    const payload = Buffer.from(value, 'base64');
    const { iv, encrypted, salt, authTag } = JSON.parse(payload.toString());

    return {
      iv: Buffer.from(iv, 'hex'),
      encrypted: Buffer.from(encrypted, 'hex'),
      salt: Buffer.from(salt, 'hex'),
      authTag: Buffer.from(authTag, 'hex'),
    };
  }

  private generateSecretKey(salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(this.key, salt, 100000, this.length, 'sha512');
  }
}

export default new Encryption();
