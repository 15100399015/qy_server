import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { ExtraService } from "@lib/database/modules/extra/extra.service";
import { Roles } from "@admin/decorator/roles.decorator";
import { ADMINRULES } from "@admin/constant";

// 设定
@Controller("setting")
export class SettingController {
  constructor(private readonly extraService: ExtraService) {}
  // 获取设置
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Get("get")
  getSetting(@Query("path") path) {
    return this.extraService.get(path);
  }
  // 更改设置
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Post("set")
  async setSetting(@Body() body) {
    const { path, value } = body;
    return this.extraService.set(path, value);
  }
}
