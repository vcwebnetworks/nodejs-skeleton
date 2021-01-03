export default class Money {
  public static formatBrl(value: number): string {
    const formatter = global.Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(value);
  }

  public static normalize(value: string): number {
    return Number(value.replace(/[^0-9-]/g, '')) / 100;
  }
}
