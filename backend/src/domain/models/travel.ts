import { Measurement } from './measurement';
import { TravelBus } from './travel-bus';
import { TravelFlight } from './travel-flight';
import { TravelMetro } from './travel-metro';
import { TravelRail } from './travel-rail';
import { TravelTaxi } from './travel-taxi';
import { TravelVehicle } from './travel-vehicle';
import { Unit } from './unit';

export class Travel {
  constructor(
    public readonly vehicle: TravelVehicle | null,
    public readonly bus: TravelBus | null,
    public readonly metro: TravelMetro | null,
    public readonly taxi: TravelTaxi | null,
    public readonly rail: TravelRail | null,
    public readonly flight: TravelFlight | null,
    public readonly totalEmissions: Measurement | null,
  ) {}

  public calculate(): Travel {
    const emissions = {
      vehicle: this.vehicle?.calculate() ?? null,
      bus: this.bus?.calculate() ?? null,
      metro: this.metro?.calculate() ?? null,
      taxi: this.taxi?.calculate() ?? null,
      rail: this.rail?.calculate() ?? null,
      flight: this.flight?.calculate() ?? null,
    };

    const totalEmissions = Object.values(emissions)
      .filter((e) => e !== null)
      .reduce((acc: Measurement | null, curr) => {
        return new Measurement(
          acc?.amount.plus(curr.emissions!.amount) ?? curr.emissions!.amount,
          Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
        );
      }, null);

    return new Travel(
      emissions.vehicle,
      emissions.bus,
      emissions.metro,
      emissions.taxi,
      emissions.rail,
      emissions.flight,
      totalEmissions,
    );
  }
}
