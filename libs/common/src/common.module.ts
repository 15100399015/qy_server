import { Module, Global } from '@nestjs/common';
import { DbModule } from '@libs/db';
import { ConfigModule } from '@libs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    ConfigModule,
    DbModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
      }),
    }),
  ],
  exports: [DbModule, ConfigModule, JwtModule],
})
export class CommonModule {}
