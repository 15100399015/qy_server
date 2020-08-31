import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "@libs/db/schemas";
import { Model } from "mongoose";
import { decrypt } from "@lib/util/crypto";
import { TokenOption } from "@lib/util/createToken";
import { IsNumber, IsString, validate } from "class-validator";
import { plainToClass } from "class-transformer";

class AutoTokenDto {
  @IsNumber()
  exp: number;
  @IsNumber()
  iat: number;
  @IsString()
  sub: string;
}

@Injectable()
export class RolesGuard implements CanActivate {
  // 注入工具类
  constructor(private readonly reflector: Reflector, @InjectModel(Admin.name) private readonly adminModel: Model<Admin>) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 拿到被处理程序的元数据
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) return true; // 没有拿到说明没有权限保护,则直接允许
    // 切换上下文到请求对象
    const request = context.switchToHttp().getRequest();
    if (!request.headers.token) throw new ForbiddenException("需要token"); // 如果没有发送token直接拒绝
    // 解密token
    let token: TokenOption;
    try {
      // 尝试解密如果失败则直接抛出错误token错误
      // 解密数据
      token = JSON.parse(decrypt(request.headers.token));
      // 解密成功，验证结构
      const errors = await validate(plainToClass(AutoTokenDto, token), { whitelist: true });
      if (errors.length > 0) throw new Error();
    } catch (error) {
      throw new ForbiddenException("token错误");
    }
    // 等于0说明没有设置过期时间，则不去检查是否过期，如果不等于0就去检查是否过期
    if (token.exp !== 0 && token.exp < Math.floor(Date.now() / 1000)) throw new ForbiddenException("token过期");
    // 查找用户
    const user = await this.adminModel.findById(token.sub).select("+admin_token").exec();
    if (!user) throw new ForbiddenException("用户不存在");
    if (!user.admin_token) throw new ForbiddenException("您还没有登录"); // 没有登录
    if (user.admin_token !== request.headers.token) throw new ForbiddenException("token不匹配，请尝试重新登录"); // tokne与账户里的不匹配
    // 检查是否拥有权限
    if (roles[0] === "all" || roles.some((role) => role === user.admin_roles)) {
      // 至此token合法
      request.user = user; //传递用户信息,以便处理程序使用
      return true;
    } else {
      throw new ForbiddenException("您没有此权限");
    }
  }
}
