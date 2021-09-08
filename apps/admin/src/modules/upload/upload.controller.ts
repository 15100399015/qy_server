import { Controller, Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "@admin/decorator/roles.decorator";
import { ADMINRULES } from "@admin/constant";

// 上传
@Controller("upload")
export class UploadController {
  @Post("/")
  // @Roles(ADMINRULES.__ALL_ADMIN)
  @UseInterceptors(FileInterceptor("file"))
  upload(@UploadedFile() file) {
    return file;
  }
  
}
