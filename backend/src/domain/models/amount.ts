import { InvalidValueException } from '../exceptions/invalid-value.exception';

export class Amount {
  static readonly SCALE = 2;
  static readonly NORMALIZER = Math.pow(10, Amount.SCALE);

  constructor(public readonly value: string) {
    if (!this.isValidNumber(value)) {
      throw new InvalidValueException('Amount need to be a numeric value');
    }

    this.value = Number(value).toFixed(Amount.SCALE);
  }

  private isValidNumber(value: string): boolean {
    return !isNaN(Number(value)) && value.trim() !== '';
  }

  private normalize(amount: Amount): number {
    return Number(amount.value) * Amount.NORMALIZER;
  }

  private unNormalize(value: number): number {
    return value / Amount.NORMALIZER;
  }

  public plus(amount?: Amount): Amount {
    if (!amount) {
      return this;
    }

    const sum = this.normalize(this) + this.normalize(amount);

    return new Amount(this.unNormalize(sum).toString());
  }

  public times(amount?: Amount): Amount {
    if (!amount) {
      return this;
    }

    const product =
      (this.normalize(this) * this.normalize(amount)) / Amount.NORMALIZER;

    return new Amount(this.unNormalize(product).toString());
  }
}
