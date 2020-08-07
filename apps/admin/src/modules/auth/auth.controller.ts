import {
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Put,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  // 登录
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local-admin'))
  @Post('login')
  async login(@Req() req) {
    // 拿到用户id
    const _id = req.user._id;
    // 生成token
    const token = this.jwtService.sign({
      admin_id: String(_id),
    });
    // 写入token, 表示用户已经登录
    await this.authService.upToken(_id, token);
    // 返回token
    return {
      code: 20000,
      data: {
        token: token,
      },
    };
  }
  // 获取用户信息
  @Get('getInfo')
  @UseGuards(AuthGuard('jwt-admin'))
  getInfo(@Req() req) {
    const {
      admin_roles,
      admin_introduction,
      admin_portrait,
      admin_name,
    } = req.user;
    // 返回用到的用户信息
    return {
      code: 20000,
      data: {
        roles: admin_roles,
        introduction: admin_introduction,
        avatar: admin_portrait,
        name: admin_name,
      },
    };
  }

  // 登出
  @Post('logout')
  @UseGuards(AuthGuard('jwt-admin'))
  async logout(@Req() req) {
    const _id: string = req.user._id;
    // 退出登录, 就是移除数据库中存放的token
    await this.authService.removeToken(_id);
    // 返回数据
    return {
      code: 20000,
      data: 'success',
    };
  }

  // 续签token
  @Post('renewal')
  @UseGuards(AuthGuard('jwt-admin'))
  async renewal(@Req() req) {
    const _id: string = req.user._id;
    // 生成新的 token
    const token = this.jwtService.sign({
      admin_id: String(_id),
    });
    await this.authService.upToken(_id, token);
    return token;
  }

  // 更改密码
  @Put('resetPwd')
  @UseGuards(AuthGuard('jwt-admin'))
  async resetPwd(@Req() req, @Body() body) {
    const _id: string = req.user._id;
    const newPwd: string = body.newPwd;
    await this.authService.resetPwd(_id, newPwd);
    return {
      code: 20000,
      data: 'success',
    };
  }
}
