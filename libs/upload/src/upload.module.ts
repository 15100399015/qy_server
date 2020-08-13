import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { aliossStorage, fileFilter } from './storage/ali-oss';
// AccessKey ID LTAI4G9MAwv3CdvFskBENHLC
// AccessKey Secret baeyDFZraajguOt2vvkj2QMvVrciwA
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: aliossStorage({
          config: {
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAI4G9MAwv3CdvFskBENHLC',
            accessKeySecret: 'baeyDFZraajguOt2vvkj2QMvVrciwA',
            bucket: 'qycms',
          },
        }),
        fileFilter,
      }),
    }),
  ],
  providers: [UploadService],
  exports: [UploadService, MulterModule],
})
export class UploadModule {}