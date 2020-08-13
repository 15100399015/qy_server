import { Module, Global } from '@nestjs/common';
import { DbModule } from '@libs/db';
import { ConfigModule } from '@libs/config';
import { UploadModule } from '@lib/upload';

@Global()
@Module({
  imports: [ConfigModule, DbModule, UploadModule],
  exports: [DbModule, ConfigModule, UploadModule],
})
export class CommonModule {}
