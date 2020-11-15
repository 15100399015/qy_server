import { Module, Global } from "@nestjs/common";

import { DataBaseModule } from "@lib/database";
import { ConfigureModule } from "@lib/configure";
import { UploadModule } from "@lib/upload";

@Global()
@Module({
  imports: [ConfigureModule, DataBaseModule, UploadModule],
  exports: [ConfigureModule, DataBaseModule, UploadModule],
})
export class CommonModule {}
