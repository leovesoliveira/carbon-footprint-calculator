import { HousingElectricity } from './housing-electricity';
import { HousingFuelOil } from './housing-fuel-oil';
import { HousingLpg } from './housing-lpg';
import { HousingNaturalGas } from './housing-natural-gas';
import { HousingWaste } from './housing-waste';
import { HousingWater } from './housing-water';
import { Measurement } from './measurement';
import { Unit } from './unit';

export class Housing {
  constructor(
    public readonly electricity: HousingElectricity | null,
    public readonly naturalGas: HousingNaturalGas | null,
    public readonly fuelOil: HousingFuelOil | null,
    public readonly lpg: HousingLpg | null,
    public readonly waste: HousingWaste | null,
    public readonly water: HousingWater | null,
    public readonly totalEmissions: Measurement | null,
  ) {}

  public calculate(): Housing {
    const emissions = {
      electricity: this.electricity?.calculate() ?? null,
      naturalGas: this.naturalGas?.calculate() ?? null,
      fuelOil: this.fuelOil?.calculate() ?? null,
      lpg: this.lpg?.calculate() ?? null,
      waste: this.waste?.calculate() ?? null,
      water: this.water?.calculate() ?? null,
    };

    const totalEmissions = Object.values(emissions)
      .filter((e) => e !== null)
      .reduce((acc: Measurement | null, curr) => {
        return new Measurement(
          acc?.amount.plus(curr.emissions!.amount) ?? curr.emissions!.amount,
          Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
        );
      }, null);

    return new Housing(
      emissions.electricity,
      emissions.naturalGas,
      emissions.fuelOil,
      emissions.lpg,
      emissions.waste,
      emissions.water,
      totalEmissions,
    );
  }
}
