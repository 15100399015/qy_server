import { Module } from "@nestjs/common";
import { ExtraService } from "./extra.service";

@Module({
  providers: [ExtraService],
  exports: [ExtraService],
})
export class ExtraModule {}
