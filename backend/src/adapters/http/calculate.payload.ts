import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumberString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Amount } from 'src/domain/models/amount';
import { Measurement } from 'src/domain/models/measurement';
import { Unit } from 'src/domain/models/unit';
import { CalculateData } from 'src/ports/calculate.port';

class MeasurementPayload {
  @IsNumberString()
  value: string;

  @IsEnum(Unit)
  unit: string;

  toHandle() {
    return new Measurement(new Amount(this.value), this.unit as Unit);
  }
}

class HousingPayload {
  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  electricity: MeasurementPayload | null;

  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  naturalGas: MeasurementPayload | null;

  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  fuelOil: MeasurementPayload | null;

  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  lpg: MeasurementPayload | null;

  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  waste: MeasurementPayload | null;

  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  water: MeasurementPayload | null;

  toHandle() {
    return {
      electricity: this.electricity?.toHandle() ?? null,
      naturalGas: this.naturalGas?.toHandle() ?? null,
      fuelOil: this.fuelOil?.toHandle() ?? null,
      lpg: this.lpg?.toHandle() ?? null,
      waste: this.waste?.toHandle() ?? null,
      water: this.water?.toHandle() ?? null,
    };
  }
}

class TravelPayload {
  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  vehicle: MeasurementPayload | null;

  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  bus: MeasurementPayload | null;

  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  metro: MeasurementPayload | null;

  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  taxi: MeasurementPayload | null;

  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  rail: MeasurementPayload | null;

  @ValidateNested()
  @Type(() => MeasurementPayload)
  @IsOptional()
  flight: MeasurementPayload | null;

  toHandle() {
    return {
      vehicle: this.vehicle?.toHandle() ?? null,
      bus: this.bus?.toHandle() ?? null,
      metro: this.metro?.toHandle() ?? null,
      taxi: this.taxi?.toHandle() ?? null,
      rail: this.rail?.toHandle() ?? null,
      flight: this.flight?.toHandle() ?? null,
    };
  }
}

export class CalculatePayload {
  @ValidateNested()
  @Type(() => HousingPayload)
  housing: HousingPayload;

  @ValidateNested()
  @Type(() => TravelPayload)
  travel: TravelPayload;

  toHandle(): CalculateData {
    return {
      housing: this.housing.toHandle(),
      travel: this.travel.toHandle(),
    };
  }
}
