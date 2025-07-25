import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';
import { HousingLpg } from './housing-lpg';
import { Measurement } from './measurement';
import { Unit } from './unit';

describe('HousingLpg', () => {
  const validValue = new Measurement(new Amount('500'), Unit.LITRES_PER_YEAR);
  const validFactor = new Measurement(
    new Amount('1.8'),
    Unit.KILOGRAMS_OF_CARBON_PER_LITRE,
  );

  describe('calculate()', () => {
    it('should calculate emissions correctly and return a new instance', () => {
      const housingLpg = new HousingLpg(validValue, validFactor, null);
      const result = housingLpg.calculate();

      expect(result.value).toEqual(validValue);
      expect(result.emissionsFactor).toEqual(validFactor);
      expect(result.emissions?.amount.value).toBe('900.00');
      expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
    });

    it('should throw if value has an invalid unit', () => {
      const invalidValue = new Measurement(
        new Amount('500'),
        Unit.KILOWATT_HOURS_PER_YEAR,
      );
      const housingLpg = new HousingLpg(invalidValue, validFactor, null);

      expect(() => housingLpg.calculate()).toThrow(InvalidValueException);
      expect(() => housingLpg.calculate()).toThrow(
        /Invalid unit for housing lpg value/,
      );
    });

    it('should throw if emissionsFactor has an invalid unit', () => {
      const invalidFactor = new Measurement(
        new Amount('1.8'),
        Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
      );
      const housingLpg = new HousingLpg(validValue, invalidFactor, null);

      expect(() => housingLpg.calculate()).toThrow(InvalidValueException);
      expect(() => housingLpg.calculate()).toThrow(
        /Invalid unit for housing lpg emissions factor/,
      );
    });
  });
});
