import { Module } from '@nestjs/common';
import { DbModule } from '@libs/db';
import { ConfigModule } from '@libs/config';

@Module({
  imports: [DbModule, ConfigModule],
  exports: [DbModule, ConfigModule],
})
export class CommonModule {}
