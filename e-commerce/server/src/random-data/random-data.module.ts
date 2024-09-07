import { Module } from '@nestjs/common';
import { RandomDataController } from './random-data.controller';

@Module({
  controllers: [RandomDataController],
})
export class RandomDataModule {}
