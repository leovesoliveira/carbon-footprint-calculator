import { Measurement } from 'src/domain/models/measurement';

export interface EmissionsFactorRepositoryPort {
  getAll: () => Promise<EmissionsFactorData | null>;
}

export type EmissionsFactorData = {
  housing: {
    electricity: Measurement;
    naturalGas: Measurement;
    fuelOil: Measurement;
    lpg: Measurement;
    waste: Measurement;
    water: Measurement;
  };
  travel: {
    vehicle: Measurement;
    bus: Measurement;
    metro: Measurement;
    taxi: Measurement;
    rail: Measurement;
    flight: Measurement;
  };
};
