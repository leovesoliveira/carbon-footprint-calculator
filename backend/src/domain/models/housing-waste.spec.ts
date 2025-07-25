import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';
import { HousingWaste } from './housing-waste';
import { Measurement } from './measurement';
import { Unit } from './unit';

describe('HousingWaste', () => {
  const validValue = new Measurement(new Amount('10'), Unit.KILOGRAMS_PER_WEEK);
  const validFactor = new Measurement(
    new Amount('0.25'),
    Unit.KILOGRAMS_OF_CARBON_PER_KILOGRAM,
  );

  describe('calculate()', () => {
    it('should calculate emissions correctly and return a new instance', () => {
      const housingWaste = new HousingWaste(validValue, validFactor, null);
      const result = housingWaste.calculate();

      expect(result.value).toEqual(validValue);
      expect(result.emissionsFactor).toEqual(validFactor);
      expect(result.emissions?.amount.value).toBe('130.00');
      expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
    });

    it('should throw if value has an invalid unit', () => {
      const invalidValue = new Measurement(
        new Amount('10'),
        Unit.LITRES_PER_YEAR,
      );
      const housingWaste = new HousingWaste(invalidValue, validFactor, null);

      expect(() => housingWaste.calculate()).toThrow(InvalidValueException);
      expect(() => housingWaste.calculate()).toThrow(
        /Invalid unit for housing waste value/,
      );
    });

    it('should throw if emissionsFactor has an invalid unit', () => {
      const invalidFactor = new Measurement(
        new Amount('0.25'),
        Unit.KILOGRAMS_PER_WEEK,
      );
      const housingWaste = new HousingWaste(validValue, invalidFactor, null);

      expect(() => housingWaste.calculate()).toThrow(InvalidValueException);
      expect(() => housingWaste.calculate()).toThrow(
        /Invalid unit for housing waste emissions factor/,
      );
    });
  });
});
