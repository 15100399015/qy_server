import { Controller, Post, UseGuards, Req, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { generateToken } from "@util/generate-token";
import { Roles } from "@admin/decorator/roles.decorator";
import { AuthGuard } from "./local.strategy";
import { ADMINRULES } from "@admin/constant";
import { UserInfo } from "@admin/decorator/user.decorator";

// 认证
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 登录
  @UseGuards(AuthGuard)
  @Post("login")
  async login(@UserInfo("_id") _id: string) {
    const token = generateToken({ eff: 60 * 60, sub: _id });
    await this.authService.upToken(_id, token);
    return { token };
  }
  // 获取当前用户信息
  @Roles(ADMINRULES.__ALL_ADMIN)
  @Get("getInfo")
  async getInfo(@UserInfo("_id") _id: string) {
    const { admin_roles, admin_name } = await this.authService.getInfo(_id);
    return { roles: admin_roles, name: admin_name };
  }
  // 登出
  @Roles(ADMINRULES.__ALL_ADMIN)
  @Post("logout")
  async logout(@UserInfo("_id") _id: string) {
    await this.authService.removeToken(_id);
    return { data: "success" };
  }
  // 续签token, 使用现有token生成新的token
  @Roles(ADMINRULES.__ALL_ADMIN)
  @Post("renewal")
  async renewal(@UserInfo("_id") _id: string) {
    const token = generateToken({ eff: 60 * 60, sub: _id });
    await this.authService.upToken(_id, token);
    return { token: token };
  }
}
