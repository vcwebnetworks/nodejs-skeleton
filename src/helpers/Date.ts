import AppError from '@src/errors/AppError';

class DateHelper {
  public parse(date: Date | string | number, check = true): Date {
    if (this.isValid(date as Date)) {
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

    if (check && !this.isValid(newDate)) {
      throw new AppError(`Invalid date ${date}`);
    }

    return newDate;
  }

  public isValid(date?: Date): boolean {
    return date instanceof Date && !Number.isNaN(date.getTime());
  }

  public format(date: number | Date | string | undefined, options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'America/Sao_Paulo',
    } as Intl.DateTimeFormatOptions;

    const formatter = Intl.DateTimeFormat('pr-BR', {
      ...defaultOptions,
      ...(options ?? {}),
    });

    const parseDate = typeof date === 'string' ? new Date(date) : date;

    return formatter.format(parseDate);
  }

  public calculateAge(date: Date | string | number): number {
    const birthday = +this.parse(date);
    // eslint-disable-next-line no-bitwise
    return ~~((Date.now() - birthday) / 3.15576e10);
  }
}

const dateHelper = new DateHelper();
export default dateHelper;
