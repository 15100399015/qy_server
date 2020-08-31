import { Controller, Post, Delete, Put, Param, Body, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Type, Group } from "@libs/db/schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Roles } from "@admin/decorator/roles.decorator";
import { TypeService } from "./type.service";
import { VerifyService } from "@admin/service/verify.service";
import { VerifyDtoPipe } from "@admin/pipe/verify.dto.pipe";
import { TypeDto } from "./type.dto";
import { _403, _500, _404 } from "@lib/util/HttpExceptionCode";

function insideErr() {
  _500("服务器内部错误");
}

@ApiTags("分类")
@Controller("type")
export class TypeController {
  constructor(private readonly typeService: TypeService, private readonly verifyService: VerifyService, @InjectModel(Type.name) private readonly model: Model<Type>) {}
  @Roles("admin")
  @Get("findType1/:mid")
  async findType1(@Param("mid") mid: number) {
    return this.model
      .find({
        type_pid: "",
        type_mid: mid,
      })
      .exec();
  }
  // 无条件获取所有信息
  @Roles("admin")
  @Get("findAll")
  async finAll() {
    // 填充用户权限组信息
    return this.model.find({ type_pid: "" }).populate("children").exec();
  }
  // 根据id获取单个文档
  @Roles("admin")
  @Get("findOne/:id")
  async findOne(@Param(new VerifyDtoPipe("ObjectId", "id")) id: string) {
    return this.model.findById(id).exec();
  }
  // 创建一条信息
  @Roles("admin")
  @Post("create")
  async create(@Body(new VerifyDtoPipe("document", "self", TypeDto)) doc: Type) {
    const { group_ids, type_pid, type_name, type_mid } = doc;
    const findNameRes = await this.verifyService.testOneExist(Type.name, "type_name", type_name);
    const findPIdRes = !!type_pid ? await this.verifyService.testOneExist(Type.name, "_id", type_pid) : false;
    const findGroupRes = await this.verifyService.testAllExist(Group.name, "_id", group_ids);
    // 检查分类名是否重复
    if (findNameRes) _403("分类名称重复");
    // 父分类是否存在
    if (type_pid !== undefined && type_pid !== "" && !findPIdRes) _403("顶级分类不存在");
    // 检查权限组是否存在
    if (group_ids !== undefined && group_ids.length !== 0 && !findGroupRes) _403("某些权限组不存在");
    // 子分类和父分类类型必须统一
    if (findPIdRes !== false && type_mid !== findPIdRes.type_mid) _403("子分类类型必须和父分类类型相同");
    return this.model.create(doc).catch(insideErr);
  }
  @Roles("admin")
  @Put("update/:id")
  async update(@Param(new VerifyDtoPipe("ObjectId", "id")) id: string, @Body(new VerifyDtoPipe("document", "self", TypeDto, { skipMissingProperties: true })) doc: Type) {
    const { group_ids, type_pid, type_name, type_mid } = doc;
    const findNameRes = await this.verifyService.testOneExist(Type.name, "type_name", type_name);
    const findSubTypeRes = await this.verifyService.testOneExist(Type.name, "type_pid", id);
    const findPIdRes = !!type_pid ? await this.verifyService.testOneExist(Type.name, "_id", type_pid) : false;
    const findIdRes = await this.verifyService.testOneExist(Type.name, "_id", id);
    const findGroupRes = await this.verifyService.testAllExist(Group.name, "_id", group_ids);
    // 检查是否需要更新
    if (Object.keys(doc).every((item) => doc[item].toString() === findIdRes[item].toString())) _403("无需更新");
    // 检查分类名是否重复
    if (findNameRes && String(id) !== String(findNameRes._id)) _403("分类名重复");
    // 父分类是否存在
    if (type_pid !== undefined && type_pid !== "" && !findPIdRes) _403("顶级分类不存在");
    // 检查父分类是否是二级分类
    if (findPIdRes !== false && findPIdRes.type_pid !== "") _403("不能选择子分类作为顶级分类");
    // 检查权限组是否全部存在
    if (group_ids !== undefined && group_ids.length !== 0 && !findGroupRes) _403("某些权限组不存在");
    // 不能把自己当作自己的父分类
    if (String(type_pid) === String(findIdRes._id)) _403("父分类不能选择自己");
    // 父分类在有子分类的情况下不能进行转移
    if (findIdRes.type_pid !== type_pid && findSubTypeRes) _403("请先清理子分类");
    // 分类被创建之后分类类型是不能被更改的
    if (findIdRes.type_mid !== type_mid) _403("分类创建之后，分类类型不可更改");
    return this.model.findByIdAndUpdate(id, doc).exec().catch(insideErr);
  }
  // 更新状态
  @Roles("admin")
  @Put("changStatus/:id")
  async changStatus(@Param(new VerifyDtoPipe("ObjectId", "id")) id: string, @Body() body) {
    const findIdRes = await this.verifyService.testOneExist(Type.name, "_id", id);
    if (!findIdRes) _403("分类不存在");
    return this.model.findByIdAndUpdate(id, { type_status: body.status }).catch(insideErr);
  }
  // 删除
  @Roles("admin")
  @Delete("delete/:id")
  async delete(@Param(new VerifyDtoPipe("ObjectId", "id")) id: string) {
    const findSubTypeRes = await this.verifyService.testOneExist(Type.name, "type_pid", id);
    if (findSubTypeRes) _403("请先清理子分类");
    return this.model.findByIdAndDelete(id).exec().catch(insideErr);
  }
  // 删除多个
  @Roles("admin")
  @Delete("deleteMany")
  async deleteMany(@Body() _idArr: string[]) {
    const findSubTypeRes = await this.verifyService.testInOneExists(Type.name, "type_pid", _idArr);
    if (findSubTypeRes) _403("请先清理子分类");
    return this.model.deleteMany({ _id: { $in: _idArr } }).exec().catch(insideErr);
  }
}
