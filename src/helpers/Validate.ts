export default class Validate {
  public static email(value: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    return regex.test(value);
  }

  private static calculatesDigitCpf(value: string, length: number): string {
    let sum = 0;

    for (let i = 0; i <= length - 2; i += 1) {
      sum += Number(value.charAt(i)) * (length - i);
    }

    return this.calculateRestOfDivision(sum);
  }

  private static calculatesDigitCnpj(value: string, length: number): string {
    let sum = 0;
    let position = length - 7;

    for (let i = length; i >= 1; i -= 1) {
      sum += Number((value as string).charAt(length - i)) * (position -= 1);

      if (position < 2) {
        position = 9;
      }
    }

    return this.calculateRestOfDivision(sum);
  }

  private static calculateRestOfDivision(value: number): string {
    const rest = value % 11;

    return `${rest < 2 ? 0 : 11 - rest}`;
  }

  public static cpf(value: string): boolean {
    value = value.replace(/\.|-|\s/gi, '');

    if (value.length !== 11 || value.charAt(0).repeat(11) === value) {
      return false;
    }

    const validTenDigit = this.calculatesDigitCpf(value, 10) !== value.charAt(9);
    const validElevenDigit = this.calculatesDigitCpf(value, 11) !== value.charAt(10);

    return !validTenDigit || !validElevenDigit;
  }

  public static cnpj(value: string): boolean {
    value = value.replace(/\.|-|\/|\s/gi, '');

    if (value.length !== 14 || value.charAt(0).repeat(14) === value) {
      return false;
    }

    const validTwelveDigit = this.calculatesDigitCnpj(value, 12) !== value.charAt(12);
    const validThirteenDigit = this.calculatesDigitCnpj(value, 13) !== value.charAt(13);

    return !validTwelveDigit || !validThirteenDigit;
  }

  public static isDate(date?: Date): boolean {
    return date instanceof Date && !Number.isNaN(date.getTime());
  }

  public static isCompleteName(value: string): boolean {
    return new RegExp('[A-Za-zÀ-ÖØ-öø-ÿ]\\s[A-Za-zÀ-ÖØ-öø-ÿ]+$').test(value);
  }
}
