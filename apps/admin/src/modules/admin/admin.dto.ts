import { IsString, IsEnum, IsEmail, IsOptional, IsNumber } from "class-validator";
import { ADMINRULES } from "@admin/constant";

export class AdminDto {
  // 用户名
  @IsString()
  admin_name: string;
  // 用户密码
  @IsString()
  admin_pwd: string;
  // 用户角色
  @IsEnum([ADMINRULES.ORDINART_ADMIN])
  admin_roles: string;
  // 邮箱
  @IsOptional()
  @IsEmail()
  admin_email?: string;
  // 管理员手机号
  @IsOptional()
  @IsNumber()
  admin_phone?: number;
}
