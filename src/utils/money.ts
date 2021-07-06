class MoneyHelper {
  public formatToBrl(
    value: number | string,
    options?: Omit<Intl.NumberFormatOptions, 'style' | 'currency'>,
  ): string {
    const defaultOptions = {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    } as Intl.NumberFormatOptions;

    const formatter = global.Intl.NumberFormat('pt-BR', {
      ...defaultOptions,
      ...(options ?? {}),
    });

    return formatter.format(value as number);
  }

  public normalize(value: string): number {
    return Number.parseInt(value.replace(/[^0-9-]/g, ''), 10) / 100;
  }

  public checkIsDecimal(value: any): void {
    if (Number.isNaN(+value)) {
      throw new Error(`Value ${value} is not a valid decimal value.`);
    }
  }

  public convertsToCents(value: any): any {
    this.checkIsDecimal(value);

    return Number((value * 100).toFixed());
  }
}

const money = new MoneyHelper();
export default money;
