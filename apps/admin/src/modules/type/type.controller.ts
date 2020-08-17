import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Type } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crud } from '@admin/decorator/crud';
import { Roles } from '@admin/decorator/roles.decorator';
@ApiTags('分类')
@Crud({
  model: Type,
  decorators: [Roles('admin')],
  routes: {
    delete: false,
    deleteMany: false,
    insertMany: false,
  },
})
@Controller('type')
export class TypeController {
  constructor(@InjectModel(Type.name) private readonly model: Model<Type>) {}
}
