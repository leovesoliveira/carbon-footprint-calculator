import { CarbonFootprint } from './carbon-footprint';
import { Housing } from './housing';
import { Travel } from './travel';
import { Measurement } from './measurement';
import { Unit } from './unit';
import { Amount } from './amount';

describe('CarbonFootprint', () => {
  let housing: Housing;
  let travel: Travel;
  let totalHousingEmission: Measurement;
  let totalTravelEmission: Measurement;

  beforeEach(() => {
    totalHousingEmission = new Measurement(
      new Amount('100.00'),
      Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
    );
    totalTravelEmission = new Measurement(
      new Amount('200.00'),
      Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
    );

    housing = {
      calculate: jest.fn().mockReturnValue({
        calculate: jest.fn(),
        totalEmissions: totalHousingEmission,
      }),
      totalEmissions: totalHousingEmission,
    } as unknown as Housing;

    travel = {
      calculate: jest.fn().mockReturnValue({
        calculate: jest.fn(),
        totalEmissions: totalTravelEmission,
      }),
      totalEmissions: totalTravelEmission,
    } as unknown as Travel;
  });

  it('should calculate total emissions from housing and travel', () => {
    const carbonFootprint = new CarbonFootprint(housing, travel, null);

    carbonFootprint.calculate();

    const result = carbonFootprint.getTotalEmissions();

    expect(result?.amount.value).toBe('300.00');
    expect(result?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
  });

  it('should handle null housing or travel emissions', () => {
    const carbonFootprint = new CarbonFootprint(null, travel, null);

    carbonFootprint.calculate();

    const result = carbonFootprint.getTotalEmissions();

    expect(result?.amount.value).toBe('200.00');
  });

  it('should set total emissions to null if all sources are null', () => {
    const carbonFootprint = new CarbonFootprint(null, null, null);

    carbonFootprint.calculate();

    const result = carbonFootprint.getTotalEmissions();

    expect(result).toBeNull();
  });
});
