import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';
import { Measurement } from './measurement';
import { Unit } from './unit';

export class HousingWater {
  static readonly DAYS_PER_YEAR = '365';

  constructor(
    public readonly value: Measurement,
    public readonly emissionsFactor: Measurement,
    public readonly emissions: Measurement | null,
  ) {}

  public calculate(): HousingWater {
    this.validateUnits();

    const emissions = new Measurement(
      this.value.amount
        .times(new Amount(HousingWater.DAYS_PER_YEAR))
        .times(this.emissionsFactor.amount),
      Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
    );

    return new HousingWater(this.value, this.emissionsFactor, emissions);
  }

  private validateUnits(): void {
    if (this.value.unit !== Unit.LITRES_PER_DAY) {
      throw new InvalidValueException(
        `Invalid unit for housing water value: ${this.value.unit}`,
      );
    }

    if (
      this.emissionsFactor.unit !== Unit.KILOGRAMS_OF_CARBON_PER_KILOWATT_HOUR
    ) {
      throw new InvalidValueException(
        `Invalid unit for housing water emissions factor: ${this.emissionsFactor.unit}`,
      );
    }
  }
}
