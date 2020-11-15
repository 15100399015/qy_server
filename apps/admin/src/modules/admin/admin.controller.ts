import { Controller, Post, Delete, Body, Put, Param, Get } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Admin } from "@lib/database/schemas";

import { ADMINRULES } from "@admin/constant";
import { Roles } from "@admin/decorator/roles.decorator";
import { VerifyDtoPipe } from "@admin/pipe/verify-dto.pipe";
import { _403, _404, _tcrs } from "@util/concise-exception";
import { REULTCODES } from "@admin/constant";
import { UserInfo } from "@admin/decorator/user.decorator";

import { AdminDto } from "./admin.dto";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(@InjectModel(Admin.name) private readonly model: Model<Admin>, private readonly adminService: AdminService) {}
  // 初始化一个根管理员
  @Post("initRootAdmin/:secret_key")
  async initRootAdmin(@Param("secret_key") secret_key: string) {
    const { INIT_ROOT_ADMIN_USER: admin_name, INIT_ROOT_ADMIN_PASS: admin_pwd, INIT_SECRET_KEY: init_secret_key } = process.env;
    if (init_secret_key !== secret_key) throw _404("router is not find");
    if (await this.model.findOne({ admin_roles: ADMINRULES.ROOT_ADMIN })) throw _404("router is not find");
    return this.model.create({ admin_name, admin_pwd, admin_roles: ADMINRULES.ROOT_ADMIN, admin_status: true });
  }
  // 查找管理员
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Get("find")
  async find(@Body() query) {
    const { where = {}, limit = 10, page = 1, sort = undefined, select = undefined } = query;
    const skip = (page - 1) * limit;
    const data = await this.model.find().select(select).where(where).skip(skip).limit(limit).sort(sort).exec();
    const total = await this.model.countDocuments(where);
    return { total: total, data: data, lastPage: Math.ceil(total / limit), currentPage: page, limit: data.length };
  }
  // 创建管理员
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Post("create")
  async create(@Body(new VerifyDtoPipe("document", AdminDto)) dto: Admin) {
    const { admin_name, admin_roles } = dto;
    if (admin_roles === ADMINRULES.ROOT_ADMIN) throw _tcrs(REULTCODES.PERMISSION_NO_ACCESS, "权限错误");
    if (await this.model.findOne({ admin_name })) throw _tcrs(REULTCODES.USER_HAS_EXIST, "用户已存在");
    return this.model.create(dto);
  }
  // 删除一个管理员
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Delete("delete/:id")
  async delete(@Param("id", new VerifyDtoPipe("ObjectId")) id: string) {
    const findIdRes: Admin = await this.model.findById(id).exec();
    if (!findIdRes || findIdRes.admin_roles === ADMINRULES.ROOT_ADMIN) throw _tcrs(REULTCODES.USER_NOT_EXIST, "用户不存在");
    return this.model.findByIdAndDelete(id);
  }

  // 切换管理员状态
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Put("switchStatus/:id")
  async switchStatus(@Param("id", new VerifyDtoPipe("ObjectId")) id: string) {
    const findIdRes: Admin = await this.model.findById(id).exec();
    if (!findIdRes || findIdRes.admin_roles === ADMINRULES.ROOT_ADMIN) throw _tcrs(REULTCODES.USER_NOT_EXIST, "用户不存在");
    return this.model.findByIdAndUpdate(id, { admin_status: !findIdRes.admin_status }, { new: true });
  }
  // 更改密码
  @Roles(ADMINRULES.__ALL_ADMIN)
  @Put("resetPwd")
  async resetPwd(@UserInfo("_id") id: string, @Body("newPwd") admin_pwd) {
    const findIdRes = await this.model.findById(id);
    if (!findIdRes || findIdRes.admin_roles === ADMINRULES.ROOT_ADMIN) throw _tcrs(REULTCODES.USER_NOT_EXIST, "用户不存在");
    await this.model.findByIdAndUpdate(id, { admin_pwd, admin_token: "" });
    return { data: "success" };
  }
  // 修改个人邮箱
  @Roles(ADMINRULES.__ALL_ADMIN)
  @Put("modifyEmail")
  async modifyEmail(@UserInfo("_id") id: string, @Body("email") admin_email: string) {
    return this.model.findByIdAndUpdate(id, { admin_email }, { new: true });
  }
  // 修改个人邮箱
  @Roles(ADMINRULES.__ALL_ADMIN)
  @Put("modifyPhone")
  async modifyPhone(@UserInfo("_id") id: string, @Body("phone") admin_phone: number) {
    return this.model.findByIdAndUpdate(id, { admin_phone }, { new: true });
  }
}
