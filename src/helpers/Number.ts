class NumberHelper {
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

const numberHelper = new NumberHelper();
export default numberHelper;
