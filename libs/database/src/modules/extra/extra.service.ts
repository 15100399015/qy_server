import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Setting } from "@lib/database/schemas";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ExtraService {
  constructor(@InjectModel(Setting.name) private readonly model: Model<Setting>) {}
  // 获取配置文件内容
  async get() {
    let data = await this.model.findOne({ key: "setting" });
    if (data) {
      return JSON.parse(data.value);
    } else {
      return "未找到";
    }
  }
  // 设置文件内容
  async set(value: any) {
    let data = await this.model.findOne({ key: "setting" });
    if (data) {
      await this.model.findOneAndUpdate({ key: "setting" }, { key: "setting", value: JSON.stringify(Object.assign(data, value)) });
    } else {
      await this.model.create({ key: "setting", value: JSON.stringify(value) });
    }
    return "成功";
  }
}
