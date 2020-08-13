import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor() {}
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    return file;
  }
}
