import { SettingController } from './setting.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SettingController],
})
export class SettingModule {}
