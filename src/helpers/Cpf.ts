import Mask from '@src/helpers/Mask';

class CpfHelper {
  public isValid(value: string): boolean {
    value = value.replace(/\.|-|\s/gi, '');

    if (value.length !== 11 || value.charAt(0).repeat(11) === value) {
      return false;
    }

    const validTenDigit = CpfHelper.calculate(value, 10) !== value.charAt(9);
    const validElevenDigit = CpfHelper.calculate(value, 11) !== value.charAt(10);

    return !validTenDigit || !validElevenDigit;
  }

  public format(value: string): string {
    return Mask.cpf(value);
  }

  private static calculate(value: string, length: number): string {
    let sum = 0;

    for (let i = 0; i <= length - 2; i += 1) {
      sum += Number(value.charAt(i)) * (length - i);
    }

    return CpfHelper.restOfDivision(sum);
  }

  private static restOfDivision(value: number): string {
    const rest = value % 11;

    return `${rest < 2 ? 0 : 11 - rest}`;
  }
}

const cpfHelper = new CpfHelper();
export default cpfHelper;
