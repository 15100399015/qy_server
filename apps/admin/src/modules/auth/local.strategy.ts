import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '@libs/db/schemas';
import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local-admin') {
  constructor(@InjectModel(Admin.name) private readonly model: Model<Admin>) {
    super();
  }
  async validate(username: string, password: string) {
    const user = await this.model
      .findOne({
        admin_name: username,
      })
      .select('+admin_pwd')
      .exec();
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    if (!compareSync(password, user.admin_pwd)) {
      throw new BadRequestException('密码错误');
    }
    return user;
  }
}
