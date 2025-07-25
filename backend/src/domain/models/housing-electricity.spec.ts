import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';
import { HousingElectricity } from './housing-electricity';
import { Measurement } from './measurement';
import { Unit } from './unit';

describe('HousingElectricity', () => {
  const validValue = new Measurement(
    new Amount('1000'),
    Unit.KILOWATT_HOURS_PER_YEAR,
  );
  const validFactor = new Measurement(
    new Amount('0.5'),
    Unit.KILOGRAMS_OF_CARBON_PER_KILOWATT_HOUR,
  );

  describe('calculate()', () => {
    it('should calculate emissions correctly and return a new instance', () => {
      const housingElectricity = new HousingElectricity(
        validValue,
        validFactor,
        null,
      );
      const result = housingElectricity.calculate();

      expect(result.value).toEqual(validValue);
      expect(result.emissionsFactor).toEqual(validFactor);
      expect(result.emissions?.amount.value).toBe('500.00');
      expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
    });

    it('should throw if value has the wrong unit', () => {
      const invalidValue = new Measurement(
        new Amount('1000'),
        Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
      );
      const housingElectricity = new HousingElectricity(
        invalidValue,
        validFactor,
        null,
      );

      expect(() => housingElectricity.calculate()).toThrow(
        InvalidValueException,
      );
      expect(() => housingElectricity.calculate()).toThrow(
        /Invalid unit for housing electricity value/,
      );
    });

    it('should throw if emissionsFactor has the wrong unit', () => {
      const invalidFactor = new Measurement(
        new Amount('0.5'),
        Unit.KILOWATT_HOURS_PER_YEAR,
      );
      const housingElectricity = new HousingElectricity(
        validValue,
        invalidFactor,
        null,
      );

      expect(() => housingElectricity.calculate()).toThrow(
        InvalidValueException,
      );
      expect(() => housingElectricity.calculate()).toThrow(
        /Invalid unit for housing electricity emissions factor/,
      );
    });
  });
});
