import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "@libs/db/schemas";
import { Model } from "mongoose";
import { decrypt } from "@lib/util/crypto";
import { TokenOption } from "../../../../libs/util/createToken";
import * as Joi from "@hapi/joi";
@Injectable()
export class RolesGuard implements CanActivate {
  // 注入工具类
  constructor(private readonly reflector: Reflector, @InjectModel(Admin.name) private readonly adminModel: Model<Admin>) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 拿到被处理程序的元数据
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) return true; // 没有拿到说明没有权限保护
    // 切换到请求对象
    const request = context.switchToHttp().getRequest();
    if (!request.headers.token) throw new ForbiddenException("需要token"); // 如果没有发送token直接拒绝
    // 解密token
    let token: TokenOption;
    try {
      // 解密数据
      token = JSON.parse(decrypt(request.headers.token));
      // 验证结构
      const { error } = Joi.object({
        exp: Joi.number().required(),
        iat: Joi.number().required(),
        sub: Joi.string().required(),
      }).validate(token);
      if (error) throw new Error();
    } catch (error) {
      throw new ForbiddenException("token错误");
    }
    if (token.exp !== 0) {
      if (token.exp < Math.floor(Date.now() / 1000)) {
        throw new ForbiddenException("token过期");
      }
    }
    // 查找用户
    const user = await this.adminModel.findById(token.sub).select("+admin_token").exec();
    if (!user) throw new ForbiddenException("用户不存在");
    if (!user.admin_token) throw new ForbiddenException("您没有登录"); // 没有登录
    if (user.admin_token !== request.headers.token) {
      throw new ForbiddenException("token不匹配"); // tokne于账户里的不匹配
    }
    // 如果元数据中存在all 则直接返回true, 代表允许所有通过token验证的用户使用,而不去检查器权限, 通常用于一些通用接口, 更改密码, 退出登录等等
    if (roles[0] === "all") {
      // 至此token合法
      request.user = user; //传递用户信息,以便处理程序使用
      return true;
    } else if (roles.some((role) => role === user.admin_roles)) {
      request.user = user; //传递用户信息,以便处理程序使用
      return true;
    } else {
      throw new ForbiddenException("您没有此权限");
    }
  }
}
