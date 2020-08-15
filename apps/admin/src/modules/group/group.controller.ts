import { Controller } from '@nestjs/common';
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
})
@Controller('group')
export class GroupController {
  constructor(@InjectModel(Group.name) private readonly model: Model<Group>) {}
}
