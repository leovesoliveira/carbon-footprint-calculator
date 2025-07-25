import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Measurement } from './measurement';
import { Unit } from './unit';

export class TravelBus {
  constructor(
    public readonly value: Measurement,
    public readonly emissionsFactor: Measurement,
    public readonly emissions: Measurement | null,
  ) {}

  public calculate(): TravelBus {
    this.validateUnits();

    const emissions = new Measurement(
      this.value.amount.times(this.emissionsFactor.amount),
      Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
    );

    return new TravelBus(this.value, this.emissionsFactor, emissions);
  }

  private validateUnits(): void {
    if (this.value.unit !== Unit.KILOMETER_PER_YEAR) {
      throw new InvalidValueException(
        `Invalid unit for travel bus value: ${this.value.unit}`,
      );
    }

    if (this.emissionsFactor.unit !== Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER) {
      throw new InvalidValueException(
        `Invalid unit for travel bus emissions factor: ${this.emissionsFactor.unit}`,
      );
    }
  }
}
