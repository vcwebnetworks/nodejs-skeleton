import cnpj from './cnpj';
import cpf from './cpf';

class Validator {
  public isValidCpf(value: string): boolean {
    return cpf.isValid(value);
  }

  public isValidCnpj(value: string): boolean {
    return cnpj.isValid(value);
  }

  public isCompleteName(value: string): boolean {
    return new RegExp('[A-Za-zÀ-ÖØ-öø-ÿ]\\s[A-Za-zÀ-ÖØ-öø-ÿ]+$').test(value);
  }
}

const validator = new Validator();
export default validator;
