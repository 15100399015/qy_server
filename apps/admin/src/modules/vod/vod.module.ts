import { Module } from '@nestjs/common';
import { VodController } from './vod.controller';
@Module({
  controllers: [VodController],
})
export class VodModule {}
