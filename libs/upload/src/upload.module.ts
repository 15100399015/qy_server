import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { aliossStorage, fileFilter } from "./storage/ali-oss";
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: aliossStorage({
          config: {
            region: "oss-cn-beijing",
            accessKeyId: "LTAI4GB4G5uASyxBBJStq4vN",
            accessKeySecret: "B1gzNbMeU4KJ4K5eH9ZU3SnKkdS1Fi",
            bucket: "liangx-gallery",
          },
        }),
        fileFilter,
      }),
    }),
  ],
  exports: [MulterModule],
})
export class UploadModule {}
