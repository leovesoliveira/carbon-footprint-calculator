import { TravelFlight } from './travel-flight';
import { Measurement } from './measurement';
import { Amount } from './amount';
import { Unit } from './unit';
import { InvalidValueException } from '../exceptions/invalid-value.exception';

describe('TravelFlight', () => {
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
      const travelFlight = new TravelFlight(validValue, validFactor, null);
      const result = travelFlight.calculate();

      expect(result.value).toEqual(validValue);
      expect(result.emissionsFactor).toEqual(validFactor);
      expect(result.emissions?.amount.value).toBe('21.80');
      expect(result.emissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
    });

    it('should throw if value has an invalid unit', () => {
      const invalidValue = new Measurement(
        new Amount('100'),
        Unit.LITRES_PER_YEAR,
      );
      const travelFlight = new TravelFlight(invalidValue, validFactor, null);

      expect(() => travelFlight.calculate()).toThrow(InvalidValueException);
      expect(() => travelFlight.calculate()).toThrow(
        /Invalid unit for travel flight value/,
      );
    });

    it('should throw if emissionsFactor has an invalid unit', () => {
      const invalidFactor = new Measurement(
        new Amount('0.2'),
        Unit.KILOGRAMS_PER_WEEK,
      );
      const travelFlight = new TravelFlight(validValue, invalidFactor, null);

      expect(() => travelFlight.calculate()).toThrow(InvalidValueException);
      expect(() => travelFlight.calculate()).toThrow(
        /Invalid unit for travel flight emissions factor/,
      );
    });
  });
});
