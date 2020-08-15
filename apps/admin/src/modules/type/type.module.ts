import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
@Module({
  controllers: [TypeController],
})
export class TypeModule {}
