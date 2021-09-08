import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { REULTCODES } from "@admin/constant";
import { _tcrs } from "@util/concise-exception";
import { Observable } from "rxjs";
import { compareSync } from "bcryptjs";
import { Admin } from "@lib/database/schemas";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectModel(Admin.name) private readonly userModel: Model<Admin>) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request, this.userModel);
  }
}

async function validateRequest(request: Request, userModel: Model<Admin>) {
  const { username, password } = request.body;
  const admin = await userModel.findOne({ admin_name: username }).select("+admin_pwd");
  if (!admin) throw _tcrs(REULTCODES.USER_NOT_EXIST, "用户不存在"); // 用户不存在
  if (!admin.admin_status) throw _tcrs(REULTCODES.USER_ACCOUNT_FORBIDDEN, "账户被禁用"); // 用户被禁用
  if (!compareSync(String(password), String(admin.admin_pwd))) throw _tcrs(REULTCODES.USER_ACCOUNT_ERROR, "密码错误"); // 密码错误
  request.user = admin;
  return true;
}
