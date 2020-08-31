import { Controller, Get, Post, Body, BadRequestException, Query, Delete } from "@nestjs/common";
import { ExtraService } from "@libs/db/modules/extra/extra.service";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "@admin/decorator/roles.decorator";

@ApiTags("设定")
@Controller("setting")
export class SettingController {
  constructor(private readonly extraService: ExtraService) {}
  // 获取设置
  @Roles("admin")
  @Get("get")
  getSetting(@Query("path") path) {
    return this.extraService.get(path);
  }
  // 更改设置
  @Roles("admin")
  @Post("set")
  async setSetting(@Body() body) {
    const { path, value } = body;
    if (!path) return new BadRequestException("路径错误");
    return this.extraService.set(path, value);
  }
  // 删除某一个键值对
  @Roles("admin")
  @Delete("del")
  del(@Query("path") path) {
    if (path) return new BadRequestException("路径错误");
  }
}
