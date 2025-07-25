import { TravelBus } from './travel-bus';
import { Measurement } from './measurement';
import { Unit } from './unit';
import { Amount } from './amount';
import { InvalidValueException } from '../exceptions/invalid-value.exception';

describe('TravelBus', () => {
  const validValue = new Measurement(
    new Amount('100'),
    Unit.KILOMETER_PER_YEAR,
  );
  const validFactor = new Measurement(
    new Amount('0.05'),
    Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER,
  );

  describe('calculate()', () => {
    it('should calculate emissions correctly and return a new instance', () => {
      const travelBus = new TravelBus(validValue, validFactor, null);
      const result = travelBus.calculate();

      expect(result.value).toEqual(validValue);
      expect(result.emissionsFactor).toEqual(validFactor);
      expect(result.emissions?.amount.value).toBe('5.00');
      expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
    });

    it('should throw if value has an invalid unit', () => {
      const invalidValue = new Measurement(
        new Amount('100'),
        Unit.LITRES_PER_YEAR,
      );
      const travelBus = new TravelBus(invalidValue, validFactor, null);

      expect(() => travelBus.calculate()).toThrow(InvalidValueException);
      expect(() => travelBus.calculate()).toThrow(
        /Invalid unit for travel bus value/,
      );
    });

    it('should throw if emissionsFactor has an invalid unit', () => {
      const invalidFactor = new Measurement(
        new Amount('0.05'),
        Unit.KILOGRAMS_PER_WEEK,
      );
      const travelBus = new TravelBus(validValue, invalidFactor, null);

      expect(() => travelBus.calculate()).toThrow(InvalidValueException);
      expect(() => travelBus.calculate()).toThrow(
        /Invalid unit for travel bus emissions factor/,
      );
    });
  });
});
