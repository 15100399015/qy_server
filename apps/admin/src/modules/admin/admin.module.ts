import { AdminController } from './admin.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AdminController],
})
export class AdminModule {}
