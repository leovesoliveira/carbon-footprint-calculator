import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from 'src/domain/exceptions/domain.exception';
import { CarbonFootprint } from 'src/domain/models/carbon-footprint';
import { Housing } from 'src/domain/models/housing';
import { HousingElectricity } from 'src/domain/models/housing-electricity';
import { HousingFuelOil } from 'src/domain/models/housing-fuel-oil';
import { HousingLpg } from 'src/domain/models/housing-lpg';
import { HousingNaturalGas } from 'src/domain/models/housing-natural-gas';
import { HousingWaste } from 'src/domain/models/housing-waste';
import { HousingWater } from 'src/domain/models/housing-water';
import { Measurement } from 'src/domain/models/measurement';
import { Travel } from 'src/domain/models/travel';
import { TravelBus } from 'src/domain/models/travel-bus';
import { TravelFlight } from 'src/domain/models/travel-flight';
import { TravelMetro } from 'src/domain/models/travel-metro';
import { TravelRail } from 'src/domain/models/travel-rail';
import { TravelTaxi } from 'src/domain/models/travel-taxi';
import { TravelVehicle } from 'src/domain/models/travel-vehicle';
import { CalculatePort, CalculateData } from 'src/ports/calculate.port';
import {
  EmissionsFactorData,
  EmissionsFactorRepositoryPort,
} from 'src/ports/emissions-factor-repository.port';

@Injectable()
export class CalculateHandler implements CalculatePort {
  private emissionsFactor: EmissionsFactorData | null = null;

  constructor(
    @Inject('EMISSIONS_FACTOR_REPOSITORY_PORT')
    private readonly emissionsFactorRepository: EmissionsFactorRepositoryPort,
  ) {}

  public async handle(calculateData: CalculateData) {
    this.emissionsFactor = await this.emissionsFactorRepository.getAll();

    if (!this.emissionsFactor) {
      throw new DomainException('Emissions factors not found');
    }

    const housing = this.buildHousing(calculateData.housing);
    const travel = this.buildTravel(calculateData.travel);

    const carbonFootprint = new CarbonFootprint(housing, travel, null);

    carbonFootprint.calculate();

    return carbonFootprint;
  }

  private buildHousing(housingData: CalculateData['housing']): Housing | null {
    if (!housingData) return null;

    const electricity = this.buildHousingElectricity(housingData.electricity);
    const naturalGas = this.buildHousingNaturalGas(housingData.naturalGas);
    const fuelOil = this.buildHousingFuelOil(housingData.fuelOil);
    const lpg = this.buildHousingLpg(housingData.lpg);
    const waste = this.buildHousingWaste(housingData.waste);
    const water = this.buildHousingWater(housingData.water);

    return new Housing(
      electricity,
      naturalGas,
      fuelOil,
      lpg,
      waste,
      water,
      null,
    );
  }

  private buildHousingElectricity(electricity: Measurement | null) {
    if (!electricity) return null;

    return new HousingElectricity(
      electricity,
      this.emissionsFactor!.housing.electricity,
      null,
    );
  }

  private buildHousingNaturalGas(naturalGas: Measurement | null) {
    if (!naturalGas) return null;

    return new HousingNaturalGas(
      naturalGas,
      this.emissionsFactor!.housing.naturalGas,
      null,
    );
  }

  private buildHousingFuelOil(fuelOil: Measurement | null) {
    if (!fuelOil) return null;

    return new HousingFuelOil(
      fuelOil,
      this.emissionsFactor!.housing.fuelOil,
      null,
    );
  }

  private buildHousingLpg(lpg: Measurement | null) {
    if (!lpg) return null;

    return new HousingLpg(lpg, this.emissionsFactor!.housing.lpg, null);
  }

  private buildHousingWaste(waste: Measurement | null) {
    if (!waste) return null;

    return new HousingWaste(waste, this.emissionsFactor!.housing.waste, null);
  }

  private buildHousingWater(water: Measurement | null) {
    if (!water) return null;

    return new HousingWater(water, this.emissionsFactor!.housing.water, null);
  }

  private buildTravel(travelData: CalculateData['travel']) {
    if (!travelData) return null;

    const vehicle = this.buildTravelVehicle(travelData.vehicle);
    const bus = this.buildTravelBus(travelData.bus);
    const metro = this.buildTravelMetro(travelData.metro);
    const taxi = this.buildTravelTaxi(travelData.taxi);
    const rail = this.buildTravelRail(travelData.rail);
    const flight = this.buildTravelFlight(travelData.flight);

    return new Travel(vehicle, bus, metro, taxi, rail, flight, null);
  }

  private buildTravelVehicle(vehicle: Measurement | null) {
    if (!vehicle) return null;

    return new TravelVehicle(
      vehicle,
      this.emissionsFactor!.travel.vehicle,
      null,
    );
  }

  private buildTravelBus(bus: Measurement | null) {
    if (!bus) return null;

    return new TravelBus(bus, this.emissionsFactor!.travel.bus, null);
  }

  private buildTravelMetro(metro: Measurement | null) {
    if (!metro) return null;

    return new TravelMetro(metro, this.emissionsFactor!.travel.metro, null);
  }

  private buildTravelTaxi(taxi: Measurement | null) {
    if (!taxi) return null;

    return new TravelTaxi(taxi, this.emissionsFactor!.travel.taxi, null);
  }

  private buildTravelRail(rail: Measurement | null) {
    if (!rail) return null;

    return new TravelRail(rail, this.emissionsFactor!.travel.rail, null);
  }

  private buildTravelFlight(flight: Measurement | null) {
    if (!flight) return null;

    return new TravelFlight(flight, this.emissionsFactor!.travel.flight, null);
  }
}
