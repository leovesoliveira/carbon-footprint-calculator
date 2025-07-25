import { CarbonFootprint } from 'src/domain/models/carbon-footprint';
import { Measurement } from 'src/domain/models/measurement';

export interface CalculatePort {
  handle: (calculateData: CalculateData) => Promise<CarbonFootprint>;
}

export type CalculateData = {
  housing: {
    electricity: Measurement | null;
    naturalGas: Measurement | null;
    fuelOil: Measurement | null;
    lpg: Measurement | null;
    waste: Measurement | null;
    water: Measurement | null;
  };
  travel: {
    vehicle: Measurement | null;
    bus: Measurement | null;
    metro: Measurement | null;
    taxi: Measurement | null;
    rail: Measurement | null;
    flight: Measurement | null;
  };
};
