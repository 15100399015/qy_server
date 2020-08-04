import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { AppModule } from '../../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [UserController],
})
export class UserModule {}
