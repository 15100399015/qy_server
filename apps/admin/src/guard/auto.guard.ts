import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "@lib/database/schemas";
import { Model } from "mongoose";
import { decrypt } from "@util/crypto";
import { TokenOption } from "@util/generate-token";
import { IsNumber, IsString, validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { REULTCODES, ADMINRULES } from "@admin/constant";
import { _tcrs } from "@util/concise-exception";

class AutoTokenDto {
  @IsNumber()
  exp: number;
  @IsNumber()
  iat: number;
  @IsString()
  sub: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  // 注入工具类
  constructor(private readonly reflector: Reflector, @InjectModel(Admin.name) private readonly adminModel: Model<Admin>) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 拿到被处理程序的元数据
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) return true; // 没有拿到说明没有权限保护,则直接允许
    // 切换上下文到请求对象
    const request = context.switchToHttp().getRequest();
    if (!request.cookies["token"]) throw _tcrs(REULTCODES.TOKEN_IS_NULL, "token not found"); // 如果没有发送token直接拒绝
    // 解密token
    let token: TokenOption;
    try {
      // 尝试解密如果失败则直接抛出错误token错误
      // 解密数据
      token = JSON.parse(decrypt(request.cookies["token"]));
      // 解密成功，验证结构
      const errors = await validate(plainToClass(AutoTokenDto, token), { whitelist: true });
      if (errors.length !== 0) throw new Error();
    } catch (error) {
      throw _tcrs(REULTCODES.TOKEN_IS_INVALID, "token format error");
    }
    // 至此token格式没有错误

    // 等于0说明没有设置过期时间，则不去检查是否过期，如果不等于0就去检查是否过期
    if (token.exp !== 0 && token.exp < Math.floor(Date.now() / 1000)) throw _tcrs(REULTCODES.TOKEN_IS_EXPIRED, "token expired");
    // 查找用户
    const admin = await this.adminModel.findById(token.sub).select("+admin_token +admin_pwd");

    if (!admin) throw _tcrs(REULTCODES.USER_NOT_EXIST, "admin is non-existent");
    if (!admin.admin_token) throw _tcrs(REULTCODES.USER_NOT_LOGGED_IN, "admin not logged on"); // 没有登录
    if (!admin.admin_status) throw _tcrs(REULTCODES.USER_ACCOUNT_FORBIDDEN, "admin disabled"); // 账户停用
    if (admin.admin_token !== request.cookies["token"]) throw _tcrs(REULTCODES.TOKEN_IS_INVALID, "token mismatch"); // tokne与账户里的不匹配
    // 检查是否拥有权限
    if (roles[0] === ADMINRULES.__ALL_ADMIN || roles.some((role) => role === admin.admin_roles)) {
      // 至此token合法
      request.user = admin; //传递用户信息,以便处理程序使用
      return true;
    } else {
      throw _tcrs(REULTCODES.PERMISSION_NO_ACCESS, "no authority");
    }
  }
}
