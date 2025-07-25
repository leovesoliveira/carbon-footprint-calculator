import { Housing } from './housing';
import { Measurement } from './measurement';
import { Travel } from './travel';
import { Unit } from './unit';

export class CarbonFootprint {
  constructor(
    private housing: Housing | null,
    private travel: Travel | null,
    // private food: Food | null, // To be implemented later
    // private products: Products | null, // To be implemented later
    // private services: Services | null, // To be implemented later
    private totalEmissions: Measurement | null,
  ) {}

  public calculate(): void {
    this.housing = this.housing?.calculate() ?? null;
    this.travel = this.travel?.calculate() ?? null;

    const emissions = [this.housing, this.travel];

    const totalEmissions = emissions
      .filter((e) => !!e?.totalEmissions)
      .reduce((acc: Measurement | null, curr) => {
        return new Measurement(
          acc?.amount.plus(curr!.totalEmissions!.amount) ??
            curr!.totalEmissions!.amount,
          Unit.KILOGRAMS_OF_CARBON_PER_YEAR,
        );
      }, null);

    this.totalEmissions = totalEmissions ?? null;
  }

  public getHousing(): Housing | null {
    return this.housing;
  }

  public getTravel(): Travel | null {
    return this.travel;
  }

  public getTotalEmissions(): Measurement | null {
    return this.totalEmissions;
  }
}
