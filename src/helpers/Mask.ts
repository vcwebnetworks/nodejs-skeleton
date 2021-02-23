export default class Mask {
  public static create(value: string, mask: string): string {
    const parseMask = mask.replace(/[^#]/g, '');
    const parseValue = Mask.unmask(value);

    if (parseMask.length !== parseValue.length) {
      return value;
    }

    let result = '';
    let maskIndex = 0;

    for (let i = 0; i < mask.length; i += 1) {
      if (mask[i] === '#') {
        result += parseValue[maskIndex];
        maskIndex += 1;
      } else if (typeof mask[i] !== 'undefined') {
        result += mask[i];
      }
    }

    return result;
  }

  public static unmask(value: string): string {
    return value.replace(/[\s\\.\-_:/]/gm, '');
  }

  public static cpf(value: string): string {
    return this.create(value, '###.###.###-##');
  }

  public static cnpj(value: string): string {
    return this.create(value, '##.###.###/####-##');
  }
}
