import { Controller, Post, Delete, Put, Param, Body, Get } from "@nestjs/common";
import { Type, Video, Article } from "@lib/database/schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Roles } from "@admin/decorator/roles.decorator";
import { VerifyDtoPipe } from "@admin/pipe/verify-dto.pipe";
import { TypeCreateDto, TypeUpDateDto } from "./type.dto";
import { _403, _500, _404, _tcrs } from "@util/concise-exception";
import { ADMINRULES, REULTCODES } from "@admin/constant";

// 分类
@Controller("type")
export class TypeController {
  constructor(
    @InjectModel(Type.name) private readonly model: Model<Type>,
    @InjectModel(Type.name) private readonly video_model: Model<Video>,
    @InjectModel(Type.name) private readonly acticle_model: Model<Article>
  ) {}
  // 根据分类类型查找所有分类
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Get("findAllTopLevel")
  async findAllTopLevel() {
    return this.model.find({ type_pid: "" }).populate("children");
  }
  // 根据分类类型查找所有分类
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Get("findChildren/:id")
  async findChildren(@Param("id", new VerifyDtoPipe("ObjectId")) type_pid: string) {
    return this.model.find({ type_pid });
  }
  // 根据分类类型查找所有分类
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Get("findContentNumber/:id")
  async findContentNumber(@Param("id", new VerifyDtoPipe("ObjectId")) type_id: string) {
    let findByIdRes = await this.model.findById(type_id);
    if (findByIdRes.type_mid === 1) {
      return this.video_model.find({ type_id }).countDocuments();
    }
    if (findByIdRes.type_mid === 2) {
      return this.acticle_model.find({ type_id }).countDocuments();
    }
  }
  // 查找
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Get("findOne/:id")
  async findOne(@Param("id", new VerifyDtoPipe("ObjectId")) id: string) {
    return this.model.findById(id);
  }
  // 根据分类类型查找所有分类
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Get("findTopLevel/:mid")
  async findTopLevel(@Param("mid") type_mid: number) {
    return this.model.find({ type_pid: "", type_mid }).populate("video_num");
  }
  // 创建一条信息
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Post("create")
  async create(@Body(new VerifyDtoPipe("document", TypeCreateDto)) doc: Type) {
    const { type_pid, type_name, type_mid } = doc;
    const findNameRes = await this.model.findOne({ type_name });
    if (findNameRes) throw _tcrs(REULTCODES.DATA_ALREADY_EXISTED, "分类名称重复");
    if (type_pid) {
      const findByIdRes = await this.model.findById(type_pid);
      if (!findByIdRes) throw _tcrs(REULTCODES.DATA_NOT_FOUND, "父分类不存在");
      if (findByIdRes.type_pid !== "") throw _tcrs(REULTCODES.DATA_IS_WRONG, "父分类不能是子分类");
      if (type_mid !== findByIdRes.type_mid) throw _tcrs(REULTCODES.DATA_IS_WRONG, "子分类类型必须和父分类类型相同");
    }
    return this.model.create(doc);
  }
  // 更新
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Put("update/:id")
  async update(@Param("id", new VerifyDtoPipe("ObjectId")) id: string, @Body(new VerifyDtoPipe("document", TypeUpDateDto)) doc: Type) {
    const findIdRes = await this.model.findById(id);
    if (!findIdRes) throw _tcrs(REULTCODES.DATA_NOT_FOUND, "数据不存在");
    if (Object.keys(doc).every((item) => String(doc[item]) === String(findIdRes[item]))) throw _tcrs(REULTCODES.DATA_NO_NEED_UPDATE, "无需更新");
    if (doc.type_name !== findIdRes.type_name) {
      const findNameRes = await this.model.findOne({ type_name: doc.type_name });
      if (findNameRes) throw _tcrs(REULTCODES.DATA_ALREADY_EXISTED, "分类名称重复");
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
    if (findSubTypeRes) throw _tcrs(REULTCODES.DATA_IS_WRONG, "请先清理子分类");
    await this.model.findByIdAndDelete(id);
    return "success";
  }
  // 删除多个
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Delete("deleteMany")
  async deleteMany(@Body() _idArr: string[]) {
    const findSubTypeRes = await this.model.findOne({ type_pid: { $in: _idArr } });
    if (findSubTypeRes) throw _tcrs(REULTCODES.DATA_IS_WRONG, "请先清理子分类");
    await this.model.deleteMany({ _id: { $in: _idArr } });
    return "success";
  }
  // 更新状态
  @Roles(ADMINRULES.ROOT_ADMIN)
  @Put("switchStatus/:id")
  async switchStatus(@Param("id", new VerifyDtoPipe("ObjectId")) id: string, @Body() body) {
    const findIdRes = await this.model.findById(id);
    if (!findIdRes) _403("分类不存在");
    return this.model.findByIdAndUpdate(id, { type_status: !findIdRes.type_status }).select("type_status");
  }
}
