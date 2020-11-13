export default class Validate {
  public static email(value: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    return regex.test(value);
  }

  public static cpf(cpf: string | number): boolean {
    cpf = String(cpf).replace(/\.|-|\s/gi, '');

    if (cpf.length !== 11) {
      return false;
    }

    for (let i = 0; i <= 9; i += 1) {
      if (cpf === String(i).repeat(11)) {
        return false;
      }
    }

    const calculate = (mod: number) => {
      let sum = 0;

      for (let i = 0; i <= mod - 2; i += 1) {
        sum += Number((cpf as string).charAt(i)) * (mod - i);
      }

      return String(sum % 11 < 2 ? 0 : 11 - (sum % 11));
    };

    if (calculate(10) !== cpf.charAt(9) || calculate(11) !== cpf.charAt(10)) {
      return false;
    }

    return true;
  }

  public static cnpj(cnpj: string | number): boolean {
    cnpj = String(cnpj).replace(/\.|-|\/|\s/gi, '');

    if (cnpj.length !== 14) {
      return false;
    }

    for (let i = 0; i <= 14; i += 1) {
      if (cnpj === String(i).repeat(14)) {
        return false;
      }
    }

    const calculate = (length: number) => {
      let sum = 0;
      let position = length - 7;

      for (let i = length; i >= 1; i -= 1) {
        sum += Number((cnpj as string).charAt(length - i)) * (position -= 1);

        if (position < 2) {
          position = 9;
        }
      }

      return String(sum % 11 < 2 ? 0 : 11 - (sum % 11));
    };

    if (calculate(12) !== cnpj.charAt(12) || calculate(13) !== cnpj.charAt(13)) {
      return false;
    }

    return true;
  }

  public static isDate(date?: Date): boolean {
    return date instanceof Date && !Number.isNaN(date.getTime());
  }

  public static isCompleteName(value: string): boolean {
    return new RegExp('[A-Za-zÀ-ÖØ-öø-ÿ]\\s[A-Za-zÀ-ÖØ-öø-ÿ]+$').test(value);
  }
}
