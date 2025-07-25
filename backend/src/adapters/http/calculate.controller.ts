import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CalculatePort } from 'src/ports/calculate.port';
import { CalculatePayload } from './calculate.payload';

@Controller()
export class CalculateController {
  constructor(
    @Inject('CALCULATE_PORT') private readonly calculate: CalculatePort,
  ) {}

  @Post('calculate')
  async invoke(@Body() payload: CalculatePayload) {
    const carbonFootprint = await this.calculate.handle(payload.toHandle());

    return {
      housing: {
        totalEmissions: carbonFootprint.getHousing()
          ? {
              value: carbonFootprint.getHousing()?.totalEmissions?.amount.value,
              unit: carbonFootprint.getHousing()?.totalEmissions?.unit,
            }
          : null,
      },
      travel: {
        totalEmissions: carbonFootprint.getTravel()
          ? {
              value: carbonFootprint.getTravel()?.totalEmissions?.amount.value,
              unit: carbonFootprint.getTravel()?.totalEmissions?.unit,
            }
          : null,
      },
      totalEmissions: {
        value: carbonFootprint.getTotalEmissions()?.amount.value,
        unit: carbonFootprint.getTotalEmissions()?.unit,
      },
    };
  }
}
