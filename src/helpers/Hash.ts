import crypto, { BinaryLike, BinaryToTextEncoding } from 'crypto';

export default class Hash {
  public static md5(value: BinaryLike): string {
    return crypto.createHash('md5').update(value).digest('hex');
  }

  public static hmac(
    value: BinaryLike,
    key: BinaryLike,
    algorithm = 'sha256',
    encoding: BinaryToTextEncoding = 'hex',
  ): string {
    return crypto.createHmac(algorithm, key).update(value).digest(encoding);
  }
}
