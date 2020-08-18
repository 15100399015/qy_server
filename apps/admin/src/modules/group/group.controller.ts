import { Controller, Delete, Param, ForbiddenException } from '@nestjs/common';
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
    update: true,
    create: true,
  },
})
@Controller('group')
export class GroupController {
  constructor(
    @InjectModel(Group.name) private readonly model: Model<Group>,
    private readonly groupService: GroupService,
  ) {}

  @Delete('delete/:id')
  async delete(@Param('id') id) {
    const s = await this.groupService.inspect(id);
    if (s !== true) {
      throw new ForbiddenException(`请先清除${s}模块下的属于该组的内容`);
    }
    return this.model.findByIdAndDelete(id).exec();
  }
}
