import { Injectable } from "@nestjs/common";
import { Admin } from "@lib/database/schemas/admin.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AuthService {
  constructor(@InjectModel(Admin.name) private readonly model: Model<Admin>) {}
  // 根据id查找
  findAdminById(_id: string) {
    return this.model.findById(_id);
  }
  // 更新token
  upToken(_id: string, token: string) {
    return this.model.findByIdAndUpdate(_id, { admin_token: token });
  }
  // 清除token
  removeToken(_id: string) {
    return this.model.findByIdAndUpdate(_id, { admin_token: "" });
  }
  // 获取信息
  getInfo(_id: string) {
    return this.model.findById(_id);
  }
}
