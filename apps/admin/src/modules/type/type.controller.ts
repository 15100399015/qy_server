import {
  Controller,
  Post,
  Delete,
  Put,
  Param,
  ForbiddenException,
  Body,
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
    findAll: true,
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
  async create(@Body() body) {
    let { type_pid, group_id } = body;
    if (!(await this.typeService.inspectType(type_pid))) {
      throw new ForbiddenException('父分类不存在');
    }
  }
  // 删除之前检查有没有子分类
  @Delete('delete/:id')
  async delete(@Param('id') id) {
    // 删除之前查看是否有子分类，如果有则抛出错误
    if (await this.typeService.inspectChildren(id)) {
      throw new ForbiddenException('此分类下还有其他分类');
    }
    // 删除
    return this.model.findByIdAndDelete(id).exec();
  }
  // 更新之前检查用户组，分类
  @Put('update/:id')
  async update(@Param('id') id, @Body() body) {
    let { type_pid, group_id } = body;
    if (!(await this.typeService.inspectType(type_pid))) {
      throw new ForbiddenException('父分类不存在');
    }
  }
  // 删除多个
  @Delete('deleteMany')
  deleteMany() {}
}
