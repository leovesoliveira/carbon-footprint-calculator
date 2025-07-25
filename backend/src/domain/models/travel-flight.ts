import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';
import { Measurement } from './measurement';
import { Unit } from './unit';

export class TravelFlight {
  static readonly RADIATIVE_FORCING_MULTIPLIER = '1.09';

  constructor(
    public readonly value: Measurement,
    public readonly emissionsFactor: Measurement,
    public readonly emissions: Measurement | null,
  ) {}

  public calculate(): TravelFlight {
    this.validateUnits();

    const emissions = new Measurement(
      this.value.amount
        .times(new Amount(TravelFlight.RADIATIVE_FORCING_MULTIPLIER))
        .times(this.emissionsFactor.amount),
      Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
    );

    return new TravelFlight(this.value, this.emissionsFactor, emissions);
  }

  private validateUnits(): void {
    if (this.value.unit !== Unit.KILOMETER_PER_YEAR) {
      throw new InvalidValueException(
        `Invalid unit for travel flight value: ${this.value.unit}`,
      );
    }

    if (this.emissionsFactor.unit !== Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER) {
      throw new InvalidValueException(
        `Invalid unit for travel flight emissions factor: ${this.emissionsFactor.unit}`,
      );
    }
  }
}
