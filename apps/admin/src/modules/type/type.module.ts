import { Module } from "@nestjs/common";
import { TypeController } from "./type.controller";
import { TypeService } from "./type.service";
import { VerifyService } from "@admin/service/verify.service";
@Module({
  controllers: [TypeController],
  providers: [TypeService, VerifyService],
})
export class TypeModule {}
