import { ParsedUrlQueryInput, stringify } from 'querystring';

import helperHash from '@helpers/Hash';

class Index {
  public getImageGravatar(email: string, params?: ParsedUrlQueryInput): string {
    const query = params ? `?${stringify(params)}` : '';

    return `https://www.gravatar.com/avatar/${helperHash.md5(email)}${query}`;
  }

  public bytesToSize(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  }

  public normalizeValue<T extends any>(value: any): T {
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

const helper = new Index();
export default helper;
