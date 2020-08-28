import { Controller, Post, UseGuards, Req, Get, Put, Body } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { createToken } from "@lib/util/createToken";
import { Roles } from "@admin/decorator/roles.decorator";

@ApiTags("认证")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 登录
  @ApiOperation({ summary: "登录" })
  @UseGuards(AuthGuard("local-admin"))
  @Post("login")
  async login(@Req() req) {
    // 拿到用户id
    const { _id } = req.user;
    // 生成token
    const token = createToken({
      eff: 60 * 60,
      sub: _id,
    });
    // 写入token, 表示用户已经登录
    await this.authService.upToken(_id, token);
    // 返回token
    return {
      token: token,
    };
  }
  // 获取当前用户信息
  @Get("getInfo")
  @Roles("all")
  async getInfo(@Req() req) {
    const _id: string = req.user._id;
    const { admin_roles, admin_introduction, admin_portrait, admin_name } = await this.authService.getInfo(_id);
    // 返回用到的用户信息
    return {
      roles: admin_roles,
      introduction: admin_introduction,
      avatar: admin_portrait,
      name: admin_name,
    };
  }

  // 登出
  @Post("logout")
  @Roles("all")
  async logout(@Req() req) {
    const _id: string = req.user._id;
    // 退出登录, 就是移除数据库中存放的token
    await this.authService.removeToken(_id);
    // 返回数据
    return {
      data: "success",
    };
  }

  // 续签token, 使用现有token生成新的token
  @Post("renewal")
  @Roles("all")
  async renewal(@Req() req) {
    // 解密出id
    const _id: string = req.user._id;
    // 生成返回token
    const token = createToken({
      eff: 60 * 60,
      sub: _id,
    });
    // 写入token, 表示用户已经登录
    await this.authService.upToken(_id, token);
    // 返回token
    return {
      token: token,
    };
  }

  // 更改密码
  @Put("resetPwd")
  @Roles("all")
  async resetPwd(@Req() req, @Body() body) {
    const _id: string = req.user._id;
    const newPwd: string = body.newPwd;
    await this.authService.resetPwd(_id, newPwd);
    return {
      data: "success",
    };
  }
}
