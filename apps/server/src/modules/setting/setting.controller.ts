import { Controller, Get, Query } from "@nestjs/common";
import { Setting } from "@lib/database/schemas";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { _403, _404, _tcrs } from "@util/concise-exception";

// 设定
@Controller("setting")
export class SettingController {
  constructor(@InjectModel(Setting.name) private readonly model: Model<Setting>) {}
  @Get("get")
  async getSetting(@Query("key") key: string) {
    let data = await this.model.findOne({ key });
    if (data) return JSON.parse(data.value);
    else throw _404("未找到");
  }
}
