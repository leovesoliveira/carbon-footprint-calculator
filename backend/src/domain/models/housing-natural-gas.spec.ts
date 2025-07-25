import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';
import { HousingNaturalGas } from './housing-natural-gas';
import { Measurement } from './measurement';
import { Unit } from './unit';

describe('HousingNaturalGas', () => {
  const validValue = new Measurement(new Amount('300'), Unit.THERMS_PER_YEAR);
  const validFactor = new Measurement(
    new Amount('2.2'),
    Unit.KILOGRAMS_OF_CARBON_PER_THERM,
  );

  describe('calculate()', () => {
    it('should calculate emissions correctly and return a new instance', () => {
      const housingNaturalGas = new HousingNaturalGas(
        validValue,
        validFactor,
        null,
      );
      const result = housingNaturalGas.calculate();

      expect(result.value).toEqual(validValue);
      expect(result.emissionsFactor).toEqual(validFactor);
      expect(result.emissions?.amount.value).toBe('660.00');
      expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
    });

    it('should throw if value has an invalid unit', () => {
      const invalidValue = new Measurement(
        new Amount('300'),
        Unit.LITRES_PER_YEAR,
      );
      const housingNaturalGas = new HousingNaturalGas(
        invalidValue,
        validFactor,
        null,
      );

      expect(() => housingNaturalGas.calculate()).toThrow(
        InvalidValueException,
      );
      expect(() => housingNaturalGas.calculate()).toThrow(
        /Invalid unit for housing natural gas value/,
      );
    });

    it('should throw if emissionsFactor has an invalid unit', () => {
      const invalidFactor = new Measurement(
        new Amount('2.2'),
        Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
      );
      const housingNaturalGas = new HousingNaturalGas(
        validValue,
        invalidFactor,
        null,
      );

      expect(() => housingNaturalGas.calculate()).toThrow(
        InvalidValueException,
      );
      expect(() => housingNaturalGas.calculate()).toThrow(
        /Invalid unit for housing natural gas emissions factor/,
      );
    });
  });
});
