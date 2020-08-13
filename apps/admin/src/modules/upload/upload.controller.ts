import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '@admin/decorator/roles.decorator';

@Controller('upload')
export class UploadController {
  @Post('/')
  @Roles('all')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    return file;
  }
}
