import { Amount } from './amount';
import { Housing } from './housing';
import { HousingElectricity } from './housing-electricity';
import { HousingFuelOil } from './housing-fuel-oil';
import { HousingLpg } from './housing-lpg';
import { HousingNaturalGas } from './housing-natural-gas';
import { HousingWaste } from './housing-waste';
import { HousingWater } from './housing-water';
import { Measurement } from './measurement';
import { Unit } from './unit';

const mockHousingSource = (emissionsValue: string): any => {
  return {
    calculate: jest.fn().mockReturnValue({
      emissions: new Measurement(
        new Amount(emissionsValue),
        Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
      ),
    }),
  };
};

describe('Housing', () => {
  it('should calculate total emissions from all sources', () => {
    const electricity = mockHousingSource('100.00') as HousingElectricity;
    const naturalGas = mockHousingSource('200.00') as HousingNaturalGas;
    const fuelOil = mockHousingSource('300.00') as HousingFuelOil;
    const lpg = mockHousingSource('400.00') as HousingLpg;
    const waste = mockHousingSource('50.00') as HousingWaste;
    const water = mockHousingSource('25.00') as HousingWater;

    const housing = new Housing(
      electricity,
      naturalGas,
      fuelOil,
      lpg,
      waste,
      water,
      null,
    );

    const result = housing.calculate();

    expect(result.totalEmissions?.amount.value).toBe('1075.00');
    expect(result.totalEmissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
  });

  it('should handle null sources and sum only existing ones', () => {
    const electricity = mockHousingSource('150.00') as HousingElectricity;
    const water = mockHousingSource('50.00') as HousingWater;

    const housing = new Housing(
      electricity,
      null,
      null,
      null,
      null,
      water,
      null,
    );

    const result = housing.calculate();

    expect(result.totalEmissions?.amount.value).toBe('200.00');
  });

  it('should return null totalEmissions if all sources are null', () => {
    const housing = new Housing(null, null, null, null, null, null, null);
    const result = housing.calculate();

    expect(result.totalEmissions).toBeNull();
  });
});
