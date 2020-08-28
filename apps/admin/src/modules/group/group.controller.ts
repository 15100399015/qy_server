import { Controller, Delete, Param, ForbiddenException, Post, Body, Put, InternalServerErrorException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Group } from "@libs/db/schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Crud } from "@admin/decorator/crud";
import { Roles } from "@admin/decorator/roles.decorator";
import { VerifyService } from "@admin/service/verify.service";
import { VerifyDtoPipe } from "@admin/pipe/verify.dto.pipe";
import { GroupDto } from "./group.dto";
import { GroupService } from "./group.service";

@ApiTags("权限组")
@Crud({
  model: Group,
  decorators: [Roles("admin")],
  routes: {
    findAll: true,
    findOne: true,
  },
})
@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService, private readonly verifyService: VerifyService, @InjectModel(Group.name) private readonly model: Model<Group>) {}
  @Roles("admin")
  @Post("create")
  async create(@Body(new VerifyDtoPipe("document", "self", GroupDto)) doc: Group) {
    const { group_name } = doc;
    const findNameRes = await this.verifyService.testOneExist(Group.name, "group_name", group_name);
    if (findNameRes) {
      throw new ForbiddenException("组名称重复");
    }
    return this.model.create(doc).catch(() => {
      throw new InternalServerErrorException("服务器内部错误");
    });
  }
  @Roles("admin")
  @Put("update/:id")
  async update(@Param("id") id: string, @Body(new VerifyDtoPipe("document", "self", GroupDto)) doc: Group) {
    const { group_name } = doc;
    const findNameRes = await this.verifyService.testOneExist(Group.name, "group_name", group_name);
    if (findNameRes) {
      if (Object.keys(doc).every((item) => doc[item].toString() === findNameRes[item].toString())) {
        throw new ForbiddenException("无需更新");
      }
      if (String(id) !== String(findNameRes._id)) {
        throw new ForbiddenException("组名称重复");
      }
    } else {
      throw new ForbiddenException("更新不存在");
    }
    return this.model
      .findByIdAndUpdate(id, doc)
      .exec()
      .catch(() => {
        throw new InternalServerErrorException("服务器内部错误");
      });
  }
  @Roles("admin")
  @Delete("delete/:id")
  async delete(@Param(new VerifyDtoPipe("ObjectId", "id", null)) id: string) {
    const testBind = await this.groupService.inspect(id);
    if (testBind !== true) {
      throw new ForbiddenException(`请先清除${testBind}模块下的属于该组的内容`);
    }
    return this.model
      .findByIdAndDelete(id)
      .exec()
      .catch(() => {
        throw new InternalServerErrorException("服务器内部错误");
      });
  }
  @Roles("admin")
  @Put("changStatus/:id")
  async changStatus(@Param(new VerifyDtoPipe("ObjectId", "id", null)) id: string, @Body() body) {
    const findIdRes = await this.verifyService.testOneExist(Group.name, "_id", id);
    if (!findIdRes) {
      throw new ForbiddenException("权限组不存在");
    }
    return this.model
      .findByIdAndUpdate(id, {
        group_status: body.status,
      })
      .exec()
      .catch(() => {
        throw new InternalServerErrorException("服务器内部错误");
      });
  }
}
