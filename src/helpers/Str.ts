import crypto from 'crypto';

export default class Str {
  public static random(length = 16): string {
    let string = '';
    let stringLength = string.length;

    while (stringLength < length) {
      const size = length - stringLength;
      const bytes = crypto.randomBytes(size);
      const buffer = Buffer.from(bytes);

      string += buffer
        .toString('base64')
        .replace(/[^a-zA-Z0-9]/g, '')
        .substr(0, size);

      stringLength = string.length;
    }

    return string;
  }
}
