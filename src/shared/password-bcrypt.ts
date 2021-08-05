import { compare, genSalt, hash } from 'bcryptjs';

class PasswordBcrypt {
  public async hash(value: string): Promise<string> {
    return hash(value, await genSalt(12));
  }

  public async verify(value: string, hashed: string): Promise<boolean> {
    return compare(value, hashed);
  }
}

const passwordBcrypt = new PasswordBcrypt();
export default passwordBcrypt;
