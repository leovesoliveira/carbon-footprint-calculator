import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Measurement } from './measurement';
import { Unit } from './unit';

export class HousingNaturalGas {
  constructor(
    public readonly value: Measurement,
    public readonly emissionsFactor: Measurement,
    public readonly emissions: Measurement | null,
  ) {}

  public calculate(): HousingNaturalGas {
    this.validateUnits();

    const emissions = new Measurement(
      this.value.amount.times(this.emissionsFactor.amount),
      Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
    );

    return new HousingNaturalGas(this.value, this.emissionsFactor, emissions);
  }

  private validateUnits(): void {
    if (this.value.unit !== Unit.THERMS_PER_YEAR) {
      throw new InvalidValueException(
        `Invalid unit for housing natural gas value: ${this.value.unit}`,
      );
    }

    if (this.emissionsFactor.unit !== Unit.KILOGRAMS_OF_CARBON_PER_THERM) {
      throw new InvalidValueException(
        `Invalid unit for housing natural gas emissions factor: ${this.emissionsFactor.unit}`,
      );
    }
  }
}
