import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';
import { Measurement } from './measurement';
import { TravelMetro } from './travel-metro';
import { Unit } from './unit';

describe('TravelMetro', () => {
  const validValue = new Measurement(
    new Amount('100'),
    Unit.KILOMETER_PER_YEAR,
  );
  const validFactor = new Measurement(
    new Amount('0.1'),
    Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER,
  );

  describe('calculate()', () => {
    it('should calculate emissions correctly and return a new instance', () => {
      const travelMetro = new TravelMetro(validValue, validFactor, null);
      const result = travelMetro.calculate();

      expect(result.value).toEqual(validValue);
      expect(result.emissionsFactor).toEqual(validFactor);
      expect(result.emissions?.amount.value).toBe('10.00');
      expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
    });

    it('should throw if value has an invalid unit', () => {
      const invalidValue = new Measurement(
        new Amount('100'),
        Unit.LITRES_PER_YEAR,
      );
      const travelMetro = new TravelMetro(invalidValue, validFactor, null);

      expect(() => travelMetro.calculate()).toThrow(InvalidValueException);
      expect(() => travelMetro.calculate()).toThrow(
        /Invalid unit for travel metro value/,
      );
    });

    it('should throw if emissionsFactor has an invalid unit', () => {
      const invalidFactor = new Measurement(
        new Amount('0.1'),
        Unit.KILOGRAMS_PER_WEEK,
      );
      const travelMetro = new TravelMetro(validValue, invalidFactor, null);

      expect(() => travelMetro.calculate()).toThrow(InvalidValueException);
      expect(() => travelMetro.calculate()).toThrow(
        /Invalid unit for travel metro emissions factor/,
      );
    });
  });
});
