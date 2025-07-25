import { TravelTaxi } from './travel-taxi';
import { Measurement } from './measurement';
import { Unit } from './unit';
import { Amount } from './amount';
import { InvalidValueException } from '../exceptions/invalid-value.exception';

describe('TravelTaxi', () => {
  const validValue = new Measurement(
    new Amount('100'),
    Unit.KILOMETER_PER_YEAR,
  );
  const validFactor = new Measurement(
    new Amount('0.2'),
    Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER,
  );

  describe('calculate()', () => {
    it('should calculate emissions correctly and return a new instance', () => {
      const travelTaxi = new TravelTaxi(validValue, validFactor, null);
      const result = travelTaxi.calculate();

      expect(result.value).toEqual(validValue);
      expect(result.emissionsFactor).toEqual(validFactor);
      expect(result.emissions?.amount.value).toBe('20.00');
      expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
    });

    it('should throw if value has the wrong unit', () => {
      const invalidValue = new Measurement(
        new Amount('100'),
        Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
      );
      const travelTaxi = new TravelTaxi(invalidValue, validFactor, null);

      expect(() => travelTaxi.calculate()).toThrow(InvalidValueException);
      expect(() => travelTaxi.calculate()).toThrow(
        /Invalid unit for travel taxi value/,
      );
    });

    it('should throw if emissionsFactor has the wrong unit', () => {
      const invalidFactor = new Measurement(
        new Amount('0.2'),
        Unit.KILOMETER_PER_YEAR,
      );
      const travelTaxi = new TravelTaxi(validValue, invalidFactor, null);

      expect(() => travelTaxi.calculate()).toThrow(InvalidValueException);
      expect(() => travelTaxi.calculate()).toThrow(
        /Invalid unit for travel taxi emissions factor/,
      );
    });
  });
});
