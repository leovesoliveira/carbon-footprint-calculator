import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  invoke() {
    return { message: 'Health Check Ok!' };
  }
}
