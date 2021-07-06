import mask from './mask';

class Cnpj {
  public isValid(value: string): boolean {
    value = value.replace(/\.|-|\/|\s/gi, '');

    if (value.length !== 14 || value.charAt(0).repeat(14) === value) {
      return false;
    }

    const validTwelveDigit = Cnpj.calculate(value, 12) !== value.charAt(12);
    const validThirteenDigit = Cnpj.calculate(value, 13) !== value.charAt(13);

    return !validTwelveDigit || !validThirteenDigit;
  }

  public format(value: string): string {
    return mask.create(value, '##.###.###/####-##');
  }

  private static calculate(value: string, length: number): string {
    let sum = 0;
    let position = length - 7;

    for (let i = length; i >= 1; i -= 1) {
      sum += Number((value as string).charAt(length - i)) * (position -= 1);

      if (position < 2) {
        position = 9;
      }
    }

    return Cnpj.restOfDivision(sum);
  }

  private static restOfDivision(value: number): string {
    const rest = value % 11;

    return `${rest < 2 ? 0 : 11 - rest}`;
  }
}

const cnpj = new Cnpj();
export default cnpj;
