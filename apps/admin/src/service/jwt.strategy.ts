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

  async validate(_id: string) {
    const user = await this.model.findById(_id).exec();
    if (!user) {
      throw new BadRequestException('token不存在');
    }
    return user;
  }
}
