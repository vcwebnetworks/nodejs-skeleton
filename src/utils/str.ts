import crypto, { randomUUID } from 'crypto';

import number from './number';

class Str {
  public uuid(): string {
    return randomUUID();
  }

  public random(length = 16): string {
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

  public removeAccents(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g, '');
  }

  public toCamelCase(value: string): string {
    return value.toLowerCase().replace(/^([A-Z])|[\s-_](\w)/g, (_, p1, p2) => {
      if (p2) {
        return p2.toUpperCase();
      }
      return p1.toLowerCase();
    });
  }

  public toTitleCase(string: string): string {
    if (!string) {
      return '';
    }

    return string.replace(/\w\S*/g, function replace(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  public rangeCharacters(startChar: string, endChar: string): string {
    return String.fromCharCode(
      ...number.range(
        endChar.charCodeAt(0) - startChar.charCodeAt(0) + 1,
        startChar.charCodeAt(0),
      ),
    );
  }
}

const str = new Str();
export default str;
