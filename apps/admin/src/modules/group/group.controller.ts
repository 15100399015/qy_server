import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Group } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crud } from '@admin/decorator/crud';
import { Roles } from '@admin/decorator/roles.decorator';

@ApiTags('权限组')
@Crud({
  model: Group,
  decorators: [Roles('admin')],
  routes: {
    find: true,
    findAll: true,
    findOne: true,
    update: true,
  },
})
@Controller('group')
export class GroupController {
  constructor(@InjectModel(Group.name) private readonly model: Model<Group>) {}

  @Delete('deleteMany')
  deleteMany() {}

  @Delete('delete/:id')
  delete(@Param('id') id) {}
}
