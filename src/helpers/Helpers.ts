import { ParsedUrlQueryInput, stringify } from 'querystring';

import Hash from '@src/helpers/Hash';

export default class Helpers {
  public static getImageGravatar(email: string, params?: ParsedUrlQueryInput): string {
    const query = params ? `?${stringify(params)}` : '';

    return `https://www.gravatar.com/avatar/${Hash.md5(email)}${query}`;
  }

  public static bytesToSize(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  }

  public static normalizeValue<T extends any>(value: any): T {
    if (Array.isArray(value) || typeof value === 'object') {
      return value;
    }

    if (!Number.isNaN(parseFloat(value))) {
      return <T>parseFloat(value);
    }

    if (value === 'true') {
      value = true;
    }

    if (value === 'false') {
      value = false;
    }

    if (value === 'null') {
      value = null;
    }

    return value;
  }
}
