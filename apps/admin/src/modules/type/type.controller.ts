import {
  Controller,
  Post,
  Delete,
  Put,
  Param,
  ForbiddenException,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Type } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles } from '@admin/decorator/roles.decorator';
import { TypeService } from './type.service';

// 获取全部
// 获取单个
// 更新单个
// 创建单个
// 跟新多个
// 删除
// 删除多个

@ApiTags('分类')
@Controller('type')
export class TypeController {
  constructor(
    private readonly typeService: TypeService,
    @InjectModel(Type.name) private readonly model: Model<Type>,
  ) {}

  @Get('findAll')
  finAll() {}
  @Get('findOne/:id')
  findOne(@Param('id') _id: string) {
    // type_mid
    // type_pid
    // group_id
    // this.model.findOne({ _id }).populate;
    this.model.aggregate([{}, {}, {}]);
  }
  @Post()
  create() {}
  @Put('update')
  update() {}
  @Put('updateMany')
  updateMany() {}
  @Delete('delete')
  delete() {}
  @Delete('deleteMany')
  deleteMany() {}

  // // 创建之前检查用户组和父分类
  // @Post('create')
  // async create(@Body() body) {
  //   let { type_pid, group_id } = body;
  //   if (!(await this.typeService.inspectType(type_pid))) {
  //     throw new ForbiddenException('父分类不存在');
  //   }
  // }
  // // 删除之前检查有没有子分类
  // @Delete('delete/:id')
  // async delete(@Param('id') id) {
  //   // 删除之前查看是否有子分类，如果有则抛出错误
  //   if (await this.typeService.inspectChildren(id)) {
  //     throw new ForbiddenException('此分类下还有其他分类');
  //   }
  //   // 删除
  //   return this.model.findByIdAndDelete(id).exec();
  // }
  // // 更新之前检查用户组，分类
  // @Put('update/:id')
  // async update(@Param('id') id, @Body() body) {
  //   let { type_pid, group_id } = body;
  //   if (!(await this.typeService.inspectType(type_pid))) {
  //     throw new ForbiddenException('父分类不存在');
  //   }
  // }
  // // 删除多个
  // @Delete('deleteMany')
  // deleteMany() {}
}
