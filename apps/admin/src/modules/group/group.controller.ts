import { Controller, Delete, Param, Post, Body, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Group } from "@libs/db/schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Crud } from "@admin/decorator/crud";
import { Roles } from "@admin/decorator/roles.decorator";
import { VerifyService } from "@admin/service/verify.service";
import { VerifyDtoPipe } from "@admin/pipe/verify.dto.pipe";
import { _403, _404, _500, insideErr } from "@lib/util/HttpExceptionCode";
import { GroupDto } from "./group.dto";
import { GroupService } from "./group.service";

@ApiTags("权限组")
@Crud({
  model: Group,
  decorators: [Roles("admin")],
  routes: { findAll: true, findOne: true },
})
@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService, private readonly verifyService: VerifyService, @InjectModel(Group.name) private readonly model: Model<Group>) {}
  @Roles("admin")
  @Post("create")
  async create(@Body(new VerifyDtoPipe("document", "self", GroupDto, { groups: ["create"] })) doc: Group) {
    const findNameRes = await this.verifyService.testOneExist(Group.name, "group_name", doc.group_name);
    if (findNameRes) _403("组名称重复");
    return this.model.create(doc).catch(insideErr);
  }
  @Roles("admin")
  @Put("update/:id")
  async update(@Param(new VerifyDtoPipe("ObjectId", "id")) id: string, @Body(new VerifyDtoPipe("document", "self", GroupDto, { groups: ["update"] })) doc: Group) {
    const findIdRes = await this.verifyService.testOneExist(Group.name, "_id", id);
    if (!findIdRes) _403("数据不存在");
    if (Object.keys(doc).every((item) => String(doc[item]) === String(findIdRes[item]))) _403("无需更新");
    if (String(id) !== String(findIdRes._id)) _403("组名称重复");
    return this.model.findByIdAndUpdate(id, doc).exec().catch(insideErr);
  }
  @Roles("admin")
  @Delete("delete/:id")
  async delete(@Param(new VerifyDtoPipe("ObjectId", "id")) id: string) {
    const testBind = await this.groupService.inspect(id);
    if (testBind !== true) _403(`请先清除${testBind}模块下的属于该组的内容`);
    return this.model.findByIdAndDelete(id).exec().catch(insideErr);
  }

  @Roles("admin")
  @Put("changStatus/:id")
  async changStatus(@Param(new VerifyDtoPipe("ObjectId", "id")) id: string, @Body() body) {
    const findIdRes = await this.verifyService.testOneExist(Group.name, "_id", id);
    if (!findIdRes) _403("权限组不存在");
    return this.model.findByIdAndUpdate(id, { group_status: body.status }).exec().catch(insideErr);
  }
}
