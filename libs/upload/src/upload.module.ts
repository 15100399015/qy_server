import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { aliossStorage } from './storage/ali-oss';
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        // storage: aliossStorage({
        //   config: {
        //     region: 'qycmsadmin@1938695811778053.onaliyun.com',
        //     accessKeyId: 'LTAI4GHu14Hdp6nLtEDTirGo',
        //     accessKeySecret: 'KfEmISOW9u7qB4fQpc3S9bE3JRXYyQ',
        //     bucket: 'qycms',
        //   },
        // }),
        
      }),
    }),
  ],
  providers: [UploadService],
  exports: [UploadService, MulterModule],
})
export class UploadModule {}
