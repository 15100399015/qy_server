import { AuthController } from './auth.controller';
import { Module, forwardRef } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { AppModule } from '../../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [AuthController],
  providers: [LocalStrategy],
})
export class AuthModule {}
