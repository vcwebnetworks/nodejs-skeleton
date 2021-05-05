import crypto, { BinaryLike, BinaryToTextEncoding } from 'crypto';

class Hash {
  public md5(value: BinaryLike): string {
    return crypto.createHash('md5').update(value).digest('hex');
  }

  public hmac(
    value: BinaryLike,
    key: BinaryLike,
    algorithm = 'sha256',
    encoding: BinaryToTextEncoding = 'hex',
  ): string {
    return crypto.createHmac(algorithm, key).update(value).digest(encoding);
  }
}

const helperHash = new Hash();
export default helperHash;
