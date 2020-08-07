import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud } from '@admin/decorator/crud';
import { Admin } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@ApiTags('管理员')
@Crud({
  model: Admin,
})
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Admin.name) private readonly model: Model<Admin>,
  ) {}

  // 登录, 根据用户名,密码 获取 用户的 jwt token
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local-admin'))
  @Post('login')
  async login(@Req() req) {
    return {
      // 自定义code码
      code: 20000,
      data: {
        token: this.jwtService.sign(
          {
            data: String(req.user._id),
          },
          {
            expiresIn: 60 * 60,
            issuer: '杨立鹏',
          },
        ),
      },
    };
  }

  @Get('getInfo')
  @UseGuards(AuthGuard('jwt-admin'))
  getInfo(@Req() req) {
    return {
      code: 20000,
      data: {
        roles: req.user.admin_roles,
        introduction: req.user.admin_introduction,
        avatar: req.user.admin_portrait,
        name: req.user.admin_name,
      },
    };
  }
  // 登出
  @Post('logout')
  @UseGuards(AuthGuard('jwt-admin'))
  logout(@Req() req) {
    return {
      code: 20000,
      data: 'success',
    };
  }
}
