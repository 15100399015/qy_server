import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
// import { Crud } from '../../decorator/crud';
// import { Admin } from '@libs/db/schemas';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@ApiTags('管理员')
// @Crud({
//   model: Admin,
// })
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService, // @InjectModel(Admin.name) private readonly model: Model<Admin>,
  ) {}

  // 登录, 根据用户名,密码 获取 用户的 jwt token
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local-admin'))
  @Post('login')
  async login(@Req() req) {
    return {
      admin_name: req.user.admin_name,
      admin_login_history: req.user.admin_login_history,
      token: this.jwtService.sign(String(req.user._id)),
    };
  }
}
