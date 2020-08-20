import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { VerificationService } from '@admin/service/verification.service';
@Module({
  controllers: [GroupController],
  providers: [GroupService, VerificationService],
})
export class GroupModule {}
