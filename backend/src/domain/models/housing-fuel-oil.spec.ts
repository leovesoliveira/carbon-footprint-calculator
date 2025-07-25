import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';
import { HousingFuelOil } from './housing-fuel-oil';
import { Measurement } from './measurement';
import { Unit } from './unit';

describe('HousingFuelOil', () => {
  const validValue = new Measurement(new Amount('1000'), Unit.LITRES_PER_YEAR);
  const validFactor = new Measurement(
    new Amount('2.5'),
    Unit.KILOGRAMS_OF_CARBON_PER_LITRE,
  );

  describe('calculate()', () => {
    it('should calculate emissions correctly and return a new instance', () => {
      const housingFuelOil = new HousingFuelOil(validValue, validFactor, null);
      const result = housingFuelOil.calculate();

      expect(result.value).toEqual(validValue);
      expect(result.emissionsFactor).toEqual(validFactor);
      expect(result.emissions?.amount.value).toBe('2500.00');
      expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
    });

    it('should throw if value has an invalid unit', () => {
      const invalidValue = new Measurement(
        new Amount('1000'),
        Unit.KILOWATT_HOURS_PER_YEAR,
      );
      const housingFuelOil = new HousingFuelOil(
        invalidValue,
        validFactor,
        null,
      );

      expect(() => housingFuelOil.calculate()).toThrow(InvalidValueException);
      expect(() => housingFuelOil.calculate()).toThrow(
        /Invalid unit for housing fuel oil value/,
      );
    });

    it('should throw if emissionsFactor has an invalid unit', () => {
      const invalidFactor = new Measurement(
        new Amount('2.5'),
        Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
      );
      const housingFuelOil = new HousingFuelOil(
        validValue,
        invalidFactor,
        null,
      );

      expect(() => housingFuelOil.calculate()).toThrow(InvalidValueException);
      expect(() => housingFuelOil.calculate()).toThrow(
        /Invalid unit for housing fuel oil emissions factor/,
      );
    });
  });
});
