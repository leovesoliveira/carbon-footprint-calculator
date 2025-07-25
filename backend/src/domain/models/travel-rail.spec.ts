import { TravelRail } from './travel-rail';
import { Measurement } from './measurement';
import { Unit } from './unit';
import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';

describe('TravelRail', () => {
  const validValue = new Measurement(
    new Amount('100'),
    Unit.KILOMETER_PER_YEAR,
  );
  const validEmissionsFactor = new Measurement(
    new Amount('0.05'),
    Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER,
  );

  it('should calculate emissions correctly with valid units', () => {
    const travelRail = new TravelRail(validValue, validEmissionsFactor, null);
    const result = travelRail.calculate();

    expect(result.emissions).not.toBeNull();
    expect(result.emissions?.amount.value).toBe('5.00');
    expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
  });

  it('should throw if value unit is invalid', () => {
    const invalidValue = new Measurement(
      new Amount('100'),
      Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
    );
    const travelRail = new TravelRail(invalidValue, validEmissionsFactor, null);

    expect(() => travelRail.calculate()).toThrow(InvalidValueException);
    expect(() => travelRail.calculate()).toThrow(
      /Invalid unit for travel rail value/,
    );
  });

  it('should throw if emissionsFactor unit is invalid', () => {
    const invalidEmissionsFactor = new Measurement(
      new Amount('0.05'),
      Unit.KILOMETER_PER_YEAR,
    );
    const travelRail = new TravelRail(validValue, invalidEmissionsFactor, null);

    expect(() => travelRail.calculate()).toThrow(InvalidValueException);
    expect(() => travelRail.calculate()).toThrow(
      /Invalid unit for travel rail emissions factor/,
    );
  });
});
