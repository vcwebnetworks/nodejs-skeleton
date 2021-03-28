export default class Validate {
  public static isCompleteName(value: string): boolean {
    return new RegExp('[A-Za-zÀ-ÖØ-öø-ÿ]\\s[A-Za-zÀ-ÖØ-öø-ÿ]+$').test(value);
  }
}
