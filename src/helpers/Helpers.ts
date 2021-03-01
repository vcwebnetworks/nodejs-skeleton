import { ParsedUrlQueryInput, stringify } from 'querystring';

import AppError from '@src/errors/AppError';
import Hash from '@src/helpers/Hash';
import Validate from '@src/helpers/Validate';

export default class Helpers {
  public static createDate(date: Date | string | number, check = true): Date {
    if (Validate.isDate(date as Date)) {
      return <Date>date;
    }

    if (!Number.isNaN(Number(date))) {
      date = Number(date);
    } else if (typeof date === 'string') {
      const [parseDate, parseHour] = date.split(' ', 2);
      const dateTime = parseHour ? ` ${parseHour}` : '';

      if (parseDate.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/gi)) {
        date = `${parseDate.split('/').reverse().join('/')}${dateTime}`;
      } else if (parseDate.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/gi)) {
        date = `${parseDate}${dateTime}`;
      }
    }

    const newDate = new Date(date);

    if (check && !Validate.isDate(newDate)) {
      throw new AppError(`Invalid date ${date}`);
    }

    return newDate;
  }

  public static calculateAge(date: Date | string | number): number {
    const birthday = +Helpers.createDate(date);
    // eslint-disable-next-line no-bitwise
    return ~~((Date.now() - birthday) / 3.15576e10);
  }

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
