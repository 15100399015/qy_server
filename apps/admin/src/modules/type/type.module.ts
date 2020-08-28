import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { VerificationService } from '@admin/service/verify.service';
@Module({
  controllers: [TypeController],
  providers: [TypeService, VerificationService],
})
export class TypeModule {}
