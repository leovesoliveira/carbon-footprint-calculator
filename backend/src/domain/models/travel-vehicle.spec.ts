import { TravelVehicle } from './travel-vehicle';
import { Measurement } from './measurement';
import { Unit } from './unit';
import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';

describe('TravelVehicle', () => {
  const validValue = new Measurement(
    new Amount('200'),
    Unit.KILOMETER_PER_YEAR,
  );
  const validEmissionsFactor = new Measurement(
    new Amount('0.1'),
    Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER,
  );

  it('should calculate emissions correctly with valid units', () => {
    const travelVehicle = new TravelVehicle(
      validValue,
      validEmissionsFactor,
      null,
    );
    const result = travelVehicle.calculate();

    expect(result.emissions).not.toBeNull();
    expect(result.emissions?.amount.value).toBe('20.00');
    expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
  });

  it('should throw if value unit is invalid', () => {
    const invalidValue = new Measurement(
      new Amount('200'),
      Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
    );
    const travelVehicle = new TravelVehicle(
      invalidValue,
      validEmissionsFactor,
      null,
    );

    expect(() => travelVehicle.calculate()).toThrow(InvalidValueException);
    expect(() => travelVehicle.calculate()).toThrow(
      /Invalid unit for travel vehicle value/,
    );
  });

  it('should throw if emissionsFactor unit is invalid', () => {
    const invalidEmissionsFactor = new Measurement(
      new Amount('0.1'),
      Unit.KILOMETER_PER_YEAR,
    );
    const travelVehicle = new TravelVehicle(
      validValue,
      invalidEmissionsFactor,
      null,
    );

    expect(() => travelVehicle.calculate()).toThrow(InvalidValueException);
    expect(() => travelVehicle.calculate()).toThrow(
      /Invalid unit for travel vehicle emissions factor/,
    );
  });
});
