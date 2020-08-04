import { Module, forwardRef } from '@nestjs/common';
import { VodController } from './vod.controller';
import { AppModule } from '../../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [VodController],
})
export class VodModule {}
