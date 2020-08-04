import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthController],
  providers: [LocalStrategy],
})
export class AuthModule {}
