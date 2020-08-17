import {
  Controller,
  Post,
  Delete,
  Put,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Type } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crud } from '@admin/decorator/crud';
import { Roles } from '@admin/decorator/roles.decorator';
import { TypeService } from './type.service';
@ApiTags('分类')
@Crud({
  model: Type,
  decorators: [Roles('admin')],
  routes: {
    find: true,
    findOne: true,
  },
})
@Controller('type')
export class TypeController {
  constructor(
    @InjectModel(Type.name) private readonly model: Model<Type>,
    private readonly typeService: TypeService,
  ) {}
  // 创建之前检查用户组和父分类
  @Post('create')
  create() {}
  // 删除之前检查有没有子分类
  @Delete('delete/:id')
  async delete(@Param('id') id) {
    if (await this.typeService.inspectChildren(id)) {
      throw new ForbiddenException('此分类下还有其他分类');
    }
    return this.model.findByIdAndDelete(id).exec();
  }
  // 更新之前检查用户组，分类
  @Put('update')
  update() {}
}
