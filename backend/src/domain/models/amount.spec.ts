import { InvalidValueException } from '../exceptions/invalid-value.exception';
import { Amount } from './amount';

describe('Amount', () => {
  describe('constructor', () => {
    it('should create an instance with a normalized value (2 decimal places)', () => {
      const amount = new Amount('12.345');
      expect(amount.value).toBe('12.35');
    });

    it('should throw InvalidValueException for non-numeric input', () => {
      expect(() => new Amount('abc123')).toThrow(InvalidValueException);
      expect(() => new Amount('abc')).toThrow(InvalidValueException);
      expect(() => new Amount('')).toThrow(InvalidValueException);
      expect(() => new Amount('  ')).toThrow(InvalidValueException);
    });
  });

  describe('plus', () => {
    it('should return the same amount if plus is called with undefined', () => {
      const a = new Amount('10.00');
      expect(a.plus()).toEqual(a);
    });

    it('should sum two amounts correctly', () => {
      const a = new Amount('10.25');
      const b = new Amount('5.75');
      const result = a.plus(b);

      expect(result.value).toBe('16.00');
    });

    it('should maintain precision when adding fractional values', () => {
      const a = new Amount('0.01');
      const b = new Amount('0.02');
      const result = a.plus(b);

      expect(result.value).toBe('0.03');
    });
  });

  describe('times', () => {
    it('should return the same amount if times is called with undefined', () => {
      const a = new Amount('10.00');
      expect(a.times()).toEqual(a);
    });

    it('should multiply two amounts correctly', () => {
      const a = new Amount('2.50');
      const b = new Amount('4.00');
      const result = a.times(b);

      expect(result.value).toBe('10.00');
    });

    it('should maintain precision when multiplying fractional values', () => {
      const a = new Amount('0.10');
      const b = new Amount('0.10');
      const result = a.times(b);

      expect(result.value).toBe('0.01');
    });
  });
});
