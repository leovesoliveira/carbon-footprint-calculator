import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';
import { Measurement } from './measurement';
import { Unit } from './unit';

export class HousingWaste {
  static readonly WEAKS_PER_YEAR = '52';

  constructor(
    public readonly value: Measurement,
    public readonly emissionsFactor: Measurement,
    public readonly emissions: Measurement | null,
  ) {}

  public calculate(): HousingWaste {
    this.validateUnits();

    const emissions = new Measurement(
      this.value.amount
        .times(new Amount(HousingWaste.WEAKS_PER_YEAR))
        .times(this.emissionsFactor.amount),
      Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
    );

    return new HousingWaste(this.value, this.emissionsFactor, emissions);
  }

  private validateUnits(): void {
    if (this.value.unit !== Unit.KILOGRAMS_PER_WEEK) {
      throw new InvalidValueException(
        `Invalid unit for housing waste value: ${this.value.unit}`,
      );
    }

    if (this.emissionsFactor.unit !== Unit.KILOGRAMS_OF_CARBON_PER_KILOGRAM) {
      throw new InvalidValueException(
        `Invalid unit for housing waste emissions factor: ${this.emissionsFactor.unit}`,
      );
    }
  }
}
