import { Module, Global } from '@nestjs/common';
import { DbModule } from '@libs/db';
import { ConfigModule } from '@libs/config';

@Global()
@Module({
  imports: [ConfigModule, DbModule],
  exports: [DbModule, ConfigModule],
})
export class CommonModule {}
