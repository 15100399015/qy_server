import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
