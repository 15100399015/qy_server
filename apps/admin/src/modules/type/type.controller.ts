import { Controller, Post, Delete, Put, Param, Body, Get } from "@nestjs/common";
import { Type } from "@lib/database/schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Roles } from "@admin/decorator/roles.decorator";
import { VerifyDtoPipe } from "@admin/pipe/verify-dto.pipe";
import { TypeCreateDto, TypeUpDateDto } from "./type.dto";
import { _403, _500, _404 } from "@util/concise-exception";
import { ADMINRULES } from "@admin/constant";

// 分类
@Controller("type")
export class TypeController {
  constructor(@InjectModel(Type.name) private readonly model: Model<Type>) {}
  // 查找
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Get("findOne/:id")
  async findOne(@Param("id", new VerifyDtoPipe("ObjectId")) id: string) {
    return this.model.findById(id);
  }
  // 根据分类类型查找所有分类
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Get("findType/:mid")
  async findType(@Param("mid") mid: number) {
    return this.model.find({ type_pid: "", type_mid: mid }).populate("children");
  }
  // 创建一条信息
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Post("create")
  async create(@Body(new VerifyDtoPipe("document", TypeCreateDto)) doc: Type) {
    const { type_pid, type_name, type_mid } = doc;
    const findNameRes = await this.model.findOne({ type_name });
    if (findNameRes) _403("分类名称重复");
    if (type_pid !== undefined) {
      const findByIdRes = await this.model.findById(type_pid);
      if (!findByIdRes) _403("父分类不存在");
      if (findByIdRes.type_pid !== "") _403("父分类不能是子分类");
      if (type_mid !== findByIdRes.type_mid) _403("子分类类型必须和父分类类型相同");
    }
    return this.model.create(doc);
  }
  // 更新
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Put("update/:id")
  async update(@Param("id", new VerifyDtoPipe("ObjectId")) id: string, @Body(new VerifyDtoPipe("document", TypeUpDateDto)) doc: Type) {
    const findIdRes = await this.model.findById(id);
    if (!findIdRes) _403("数据不存在");
    if (Object.keys(doc).every((item) => String(doc[item]) === String(findIdRes[item]))) _403("无需更新");
    if (doc.type_name !== findIdRes.type_name) {
      const findNameRes = await this.model.findOne({ type_name: doc.type_name });
      if (findNameRes) _403("分类名重复");
    }
    return this.model.findByIdAndUpdate(id, {
      type_name: doc.type_name,
      type_sub: doc.type_sub,
      type_sort: doc.type_sort,
      type_status: doc.type_status,
      type_logo: doc.type_logo,
      type_pic: doc.type_pic,
      type_extend: doc.type_extend,
    });
  }
  // 删除
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Delete("delete/:id")
  async delete(@Param("id", new VerifyDtoPipe("ObjectId")) id: string) {
    const findSubTypeRes = await this.model.findOne({ type_pid: id });
    if (findSubTypeRes) _403("请先清理子分类");
    return this.model.findByIdAndDelete(id);
  }
  // 删除多个
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Delete("deleteMany")
  async deleteMany(@Body() _idArr: string[]) {
    const findSubTypeRes = await this.model.findOne({ type_pid: { $in: _idArr } });
    if (findSubTypeRes) _403("请先清理子分类");
    return this.model.deleteMany({ _id: { $in: _idArr } });
  }
  // 更新状态
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Put("changStatus/:id")
  async changStatus(@Param("id", new VerifyDtoPipe("ObjectId")) id: string, @Body() body) {
    const findIdRes = await this.model.findById(id);
    if (!findIdRes) _403("分类不存在");
    return this.model.findByIdAndUpdate(id, { type_status: !findIdRes.type_status });
  }
}
