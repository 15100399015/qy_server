import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { Setting } from "@lib/database/schemas";
import { Roles } from "@admin/decorator/roles.decorator";
import { ADMINRULES } from "@admin/constant";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { _403, _404, _tcrs } from "@util/concise-exception";

// 设定
@Controller("setting")
export class SettingController {
  constructor(@InjectModel(Setting.name) private readonly model: Model<Setting>) {}
  // 获取设置
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Get("get")
  async getSetting(@Query("key") key: string) {
    let data = await this.model.findOne({ key });
    if (data) return JSON.parse(data.value);
    else throw _404("未找到");
  }
  // 更改设置
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Post("set")
  async setSetting(@Query("key") key: string, @Body() body) {
    if (await this.model.findOneAndUpdate({ key }, { value: JSON.stringify(body) })) {
    } else await this.model.create({ key, value: JSON.stringify(body) });
    return "成功";
  }
}
