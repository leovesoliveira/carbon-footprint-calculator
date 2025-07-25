export interface ApiService {
  calculate(payload: CalculatePayload): Promise<CalculateResponse>;
}

export type CalculatePayload = {
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

export type CalculateResponse = {
  housing: {
    totalEmissions: Measurement;
  };
  travel: {
    totalEmissions: Measurement;
  };
  totalEmissions: Measurement;
};

type Measurement = {
  value: string;
  unit: string;
};
