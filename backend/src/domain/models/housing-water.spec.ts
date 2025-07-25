import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';
import { HousingWater } from './housing-water';
import { Measurement } from './measurement';
import { Unit } from './unit';

describe('HousingWater', () => {
  const validValue = new Measurement(new Amount('120'), Unit.LITRES_PER_DAY);
  const validFactor = new Measurement(
    new Amount('0.01'),
    Unit.KILOGRAMS_OF_CARBON_PER_KILOWATT_HOUR,
  );

  describe('calculate()', () => {
    it('should calculate emissions correctly and return a new instance', () => {
      const housingWater = new HousingWater(validValue, validFactor, null);
      const result = housingWater.calculate();

      expect(result.value).toEqual(validValue);
      expect(result.emissionsFactor).toEqual(validFactor);
      expect(result.emissions?.amount.value).toBe('438.00');
      expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
    });

    it('should throw if value has an invalid unit', () => {
      const invalidValue = new Measurement(
        new Amount('120'),
        Unit.KILOGRAMS_PER_WEEK,
      );
      const housingWater = new HousingWater(invalidValue, validFactor, null);

      expect(() => housingWater.calculate()).toThrow(InvalidValueException);
      expect(() => housingWater.calculate()).toThrow(
        /Invalid unit for housing water value/,
      );
    });

    it('should throw if emissionsFactor has an invalid unit', () => {
      const invalidFactor = new Measurement(
        new Amount('0.001'),
        Unit.KILOGRAMS_OF_CARBON_PER_KILOGRAM,
      );
      const housingWater = new HousingWater(validValue, invalidFactor, null);

      expect(() => housingWater.calculate()).toThrow(InvalidValueException);
      expect(() => housingWater.calculate()).toThrow(
        /Invalid unit for housing water emissions factor/,
      );
    });
  });
});
