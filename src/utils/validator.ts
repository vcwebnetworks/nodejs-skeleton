import cnpj from './cnpj';
import cpf from './cpf';
import number from './number';

class Validator {
  public isValidCpf(value: string): boolean {
    return cpf.isValid(value);
  }

  public isValidCnpj(value: string): boolean {
    return cnpj.isValid(value);
  }

  public isPhone(value: string): boolean {
    const phone = number.only(value);

    return phone.length === 11;
  }

  public isCompleteName(value: string): boolean {
    return new RegExp('[A-Za-zÀ-ÖØ-öø-ÿ]\\s[A-Za-zÀ-ÖØ-öø-ÿ]+$').test(value);
  }
}

const validator = new Validator();
export default validator;
