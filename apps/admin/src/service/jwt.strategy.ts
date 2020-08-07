import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '@libs/db/schemas';
import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(@InjectModel(Admin.name) private readonly model: Model<Admin>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);
  }

  async validate(data: any) {
    // 根据id查找用户
    const { admin_id } = data;
    const user = await this.model
      .findById(admin_id)
      .select('+admin_token')
      .exec();
    // 如果没有找到用户
    if (!user) {
      throw new BadRequestException('token不存在');
    }
    // token
    if (!user.admin_token) {
      throw new BadRequestException('请登录');
    }
    return user;
  }
}
