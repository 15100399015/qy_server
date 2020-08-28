import { Module } from "@nestjs/common";
import { GroupController } from "./group.controller";
import { GroupService } from "./group.service";
import { VerifyService } from "@admin/service/verify.service";
@Module({
  controllers: [GroupController],
  providers: [GroupService, VerifyService],
})
export class GroupModule {}
