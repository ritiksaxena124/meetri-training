import { Controller, Get } from '@nestjs/common';

@Controller('random-data')
export class RandomDataController {
  @Get()
  getRandom() {
    return Math.ceil(Math.random() * 1e6);
  }
}
