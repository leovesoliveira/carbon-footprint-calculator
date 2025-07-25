import { Module } from '@nestjs/common';
import { CalculateController } from './adapters/http/calculate.controller';
import { CalculateHandler } from './handlers/calculate.handler';
import { HealthController } from './adapters/http/health.controller';
import { EmissionsFactorRepositoryAdapter } from './adapters/database/emissions-factor-repository.adapter';

@Module({
  imports: [],
  controllers: [HealthController, CalculateController],
  providers: [
    { provide: 'CALCULATE_PORT', useClass: CalculateHandler },
    {
      provide: 'EMISSIONS_FACTOR_REPOSITORY_PORT',
      useClass: EmissionsFactorRepositoryAdapter,
    },
  ],
})
export class AppModule {}
