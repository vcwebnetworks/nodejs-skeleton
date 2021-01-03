import bcrypt from 'bcryptjs';

export default class Password {
  static hash(value: string): Promise<string> {
    return bcrypt.hash(value, 12);
  }

  static verify(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
}
