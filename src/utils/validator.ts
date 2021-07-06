import cnpj from './cnpj';
import cpf from './cpf';

class Validator {
  public isValidEmail(value: string): boolean {
    // eslint-disable-next-line no-useless-escape
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    return regex.test(value);
  }

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
