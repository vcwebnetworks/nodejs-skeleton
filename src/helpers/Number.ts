class Numbers {
  public formatBrl(value: number): string {
    const formatter = global.Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(value);
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

    let valueToCents = parseFloat(value).toFixed(2);
    valueToCents = valueToCents.replace('.', '');

    return +valueToCents;
  }

  public range(size: number, start = 0): Array<number> {
    return [...Array(size).keys()].map(i => i + start);
  }

  public random(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public only(value: string | number): string {
    return `${value}`.replace(/[^\d]/gi, '');
  }
}

const helperNumber = new Numbers();
export default helperNumber;
