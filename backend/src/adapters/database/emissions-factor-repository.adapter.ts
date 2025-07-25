import { Amount } from 'src/domain/models/amount';
import { Measurement } from 'src/domain/models/measurement';
import { Unit } from 'src/domain/models/unit';
import {
  EmissionsFactorData,
  EmissionsFactorRepositoryPort,
} from 'src/ports/emissions-factor-repository.port';

export class EmissionsFactorRepositoryAdapter
  implements EmissionsFactorRepositoryPort
{
  public getAll(): Promise<EmissionsFactorData | null> {
    return new Promise<EmissionsFactorData | null>((resolve) => {
      setTimeout(() => {
        const data: EmissionsFactorData = {
          housing: {
            electricity: new Measurement(
              new Amount('0.38'),
              Unit.KILOGRAMS_OF_CARBON_PER_KILOWATT_HOUR,
            ),
            naturalGas: new Measurement(
              new Amount('5.30'),
              Unit.KILOGRAMS_OF_CARBON_PER_THERM,
            ),
            fuelOil: new Measurement(
              new Amount('2.52'),
              Unit.KILOGRAMS_OF_CARBON_PER_LITRE,
            ),
            lpg: new Measurement(
              new Amount('1.51'),
              Unit.KILOGRAMS_OF_CARBON_PER_LITRE,
            ),
            waste: new Measurement(
              new Amount('0.45'),
              Unit.KILOGRAMS_OF_CARBON_PER_KILOGRAM,
            ),
            water: new Measurement(
              new Amount('0.05'),
              Unit.KILOGRAMS_OF_CARBON_PER_KILOWATT_HOUR,
            ),
          },
          travel: {
            vehicle: new Measurement(
              new Amount('0.25'),
              Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER,
            ),
            bus: new Measurement(
              new Amount('0.04'),
              Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER,
            ),
            metro: new Measurement(
              new Amount('0.08'),
              Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER,
            ),
            taxi: new Measurement(
              new Amount('0.25'),
              Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER,
            ),
            rail: new Measurement(
              new Amount('0.11'),
              Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER,
            ),
            flight: new Measurement(
              new Amount('0.10'),
              Unit.KILOGRAMS_OF_CARBON_PER_KILOMETER,
            ),
          },
        };

        resolve(data);
      }, 1000);
    });
  }
}
