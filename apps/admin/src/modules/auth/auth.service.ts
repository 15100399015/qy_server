import { Injectable } from '@nestjs/common';
import { Admin } from '@libs/db/schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Admin.name) private readonly model: Model<Admin>) {}
  // 根据id查找
  findAdminById(_id: string) {
    return this.model.findById(_id).exec();
  }
  // 更新token
  upToken(_id: string, token: string) {
    return this.model
      .findByIdAndUpdate(_id, {
        admin_token: token,
      })
      .exec();
  }
  // 清除token
  removeToken(_id: string) {
    return this.model
      .findByIdAndUpdate(_id, {
        admin_token: '',
      })
      .exec();
  }

  // 重置密码
  resetPwd(_id: string, newPwd: string) {
    return this.model
      .findByIdAndUpdate(_id, {
        admin_pwd: newPwd,
        admin_token: '',
      })
      .exec();
  }
}
