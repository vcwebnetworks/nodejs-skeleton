import crypto from 'crypto';

import number from './number';

class Str {
  public uuid(a?: string): string {
    return a
      ? // eslint-disable-next-line no-bitwise
        (Number(a) ^ ((Math.random() * 16) >> (Number(a) / 4))).toString(16)
      : (<string>([1e7] as never) + -1e3 + -4e3 + -8e3 + -1e11).replace(
          /[018]/g,
          this.uuid,
        );
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
