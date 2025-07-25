import { Travel } from './travel';
import { Measurement } from './measurement';
import { Unit } from './unit';
import { Amount } from './amount';
import { TravelVehicle } from './travel-vehicle';
import { TravelBus } from './travel-bus';
import { TravelMetro } from './travel-metro';
import { TravelTaxi } from './travel-taxi';
import { TravelRail } from './travel-rail';
import { TravelFlight } from './travel-flight';

const mockTravelSource = (emissionsValue: string): any => {
  return {
    calculate: jest.fn().mockReturnValue({
      emissions: new Measurement(
        new Amount(emissionsValue),
        Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
      ),
    }),
  };
};

describe('Travel', () => {
  it('should calculate total emissions from all sources', () => {
    const vehicle = mockTravelSource('10') as TravelVehicle;
    const bus = mockTravelSource('20') as TravelBus;
    const metro = mockTravelSource('30') as TravelMetro;
    const taxi = mockTravelSource('40') as TravelTaxi;
    const rail = mockTravelSource('50') as TravelRail;
    const flight = mockTravelSource('60') as TravelFlight;

    const travel = new Travel(vehicle, bus, metro, taxi, rail, flight, null);

    const result = travel.calculate();

    expect(result.totalEmissions?.amount.value).toBe('210.00');
    expect(result.totalEmissions?.unit).toBe(Unit.KILOGRAMS_OF_CARBON_PER_YEAR);
  });

  it('should handle null sources and sum only existing ones', () => {
    const vehicle = mockTravelSource('10') as TravelVehicle;
    const bus = null;
    const metro = mockTravelSource('30') as TravelMetro;
    const taxi = null;
    const rail = mockTravelSource('50') as TravelRail;
    const flight = null;

    const travel = new Travel(vehicle, bus, metro, taxi, rail, flight, null);

    const result = travel.calculate();

    expect(result.totalEmissions?.amount.value).toBe('90.00');
  });

  it('should return null totalEmissions if all sources are null', () => {
    const travel = new Travel(null, null, null, null, null, null, null);

    const result = travel.calculate();

    expect(result.totalEmissions).toBeNull();
  });
});
