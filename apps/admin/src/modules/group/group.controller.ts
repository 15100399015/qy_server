import {
  Controller,
  Delete,
  Param,
  ForbiddenException,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Group } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crud } from '@admin/decorator/crud';
import { Roles } from '@admin/decorator/roles.decorator';
import { GroupService } from './group.service';

@ApiTags('权限组')
@Crud({
  model: Group,
  decorators: [Roles('admin')],
  routes: {
    findAll: true,
    findOne: true,
  },
})
@Controller('group')
export class GroupController {
  constructor(
    @InjectModel(Group.name) private readonly model: Model<Group>,
    private readonly groupService: GroupService,
  ) {}

  @Post('create')
  async create(@Body() doc: Group) {
    const { group_name } = doc;
    if (group_name === undefined || group_name === '') {
      throw new ForbiddenException('组名称必填');
    }
    if (await this.groupService.inspectGroupByName(group_name)) {
      throw new ForbiddenException('组名称重复');
    }
    return this.model.create(doc);
  }
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() doc: Group) {
    const { group_name } = doc;
    if (group_name === undefined || group_name === '') {
      throw new ForbiddenException('组名称必填');
    }
    return this.model.findByIdAndUpdate(id, doc).exec();
  }
  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Param('id') id) {
    const testBind = await this.groupService.inspect(id);
    if (testBind !== true) {
      throw new ForbiddenException(`请先清除${testBind}模块下的属于该组的内容`);
    }
    return this.model.findByIdAndDelete(id).exec();
  }
  // 更新状态
  @Roles('admin')
  @Put('changStatus/:id')
  async changStatus(@Param('id') id: string, @Body() body) {
    if (!(await this.groupService.inspectGroupById(id))) {
      throw new ForbiddenException('分类不存在');
    }
    return this.model.findByIdAndUpdate(id, {
      group_status: body.status,
    });
  }
}
