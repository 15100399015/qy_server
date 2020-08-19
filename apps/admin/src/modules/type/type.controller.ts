import {
  Controller,
  Post,
  Delete,
  Put,
  Param,
  ForbiddenException,
  Body,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Type, Group } from '@libs/db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles } from '@admin/decorator/roles.decorator';
import { TypeService } from './type.service';

@ApiTags('分类')
@Controller('type')
export class TypeController {
  constructor(
    private readonly typeService: TypeService,
    @InjectModel(Type.name) private readonly model: Model<Type>,
  ) {}
  @Roles('admin')
  @Get('findType1/:mid')
  async findType1(@Param('mid') mid: number) {
    return this.model
      .find({
        type_pid: '',
        type_mid: mid,
      })
      .exec();
  }
  // 无条件获取所有信息
  @Roles('admin')
  @Get('findAll')
  async finAll() {
    // 填充用户权限组信息
    return this.model
      .find({
        type_pid: '',
      })
      .populate(
        'group_ids',
        {
          group_name: true,
          group_color: true,
        },
        Group.name,
      )
      .populate('children')
      .exec();
  }
  // 根据id获取单个文档
  @Roles('admin')
  @Get('findOne/:id')
  async findOne(@Param('id') id: string) {
    return this.model.findById(id).exec();
  }
  // 创建一条信息
  @Roles('admin')
  @Post('create')
  async create(@Body() doc: Type) {
    const { group_ids, type_pid, type_name } = doc;
    if (type_name === '' || type_name === undefined) {
      throw new BadRequestException('分类名必须');
    }
    if (await this.typeService.inspectTypeByName(type_name)) {
      throw new ForbiddenException('分类名称重复');
    }
    if (type_pid !== '' && type_pid !== undefined) {
      if (!(await this.typeService.inspectTypeById(type_pid))) {
        throw new ForbiddenException('顶级分类不存在');
      }
    }
    if (group_ids !== undefined && group_ids.length !== 0) {
      if (!(await this.typeService.inspectGroupById(group_ids))) {
        throw new ForbiddenException('某些权限组不存在');
      }
    }
    return this.model.create(doc);
  }
  @Roles('admin')
  @Put('update/:id')
  async update(@Body() doc: Type, @Param('id') id: string) {
    const { group_ids, type_pid, type_name } = doc;
    if (type_name === '' || type_name === undefined) {
      throw new BadRequestException('分类名必须');
    }
    if (await this.typeService.inspectTypeByName(type_name)) {
      throw new ForbiddenException('分类名称重复');
    }
    if (type_pid !== '' && type_pid !== undefined) {
      if (!(await this.typeService.inspectTypeByName(type_pid))) {
        throw new ForbiddenException('顶级分类不存在');
      }
    }
    if (group_ids !== undefined && group_ids.length !== 0) {
      if (!(await this.typeService.inspectGroupById(group_ids))) {
        throw new ForbiddenException('某些权限组不存在');
      }
    }
    return this.model.findByIdAndUpdate(id, doc).exec();
  }
  // 更新状态
  @Roles('admin')
  @Put('changStatus/:id')
  async changStatus(@Param('id') id: string, @Body() body) {
    if (!(await this.typeService.inspectTypeById(id))) {
      throw new ForbiddenException('分类不存在');
    }
    return this.model.findByIdAndUpdate(id, {
      type_status: body.status,
    });
  }
  // 删除
  @Roles('admin')
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    if (await this.typeService.inspectChildren(id)) {
      throw new ForbiddenException('请先清理子分类');
    }
    return this.model.findByIdAndDelete(id).exec();
  }
  // 删除多个
  @Roles('admin')
  @Delete('deleteMany')
  async deleteMany(@Body() _idArr: string[]) {
    if (await this.typeService.inspectsChildren(_idArr)) {
      throw new ForbiddenException('请先清理子分类');
    }
    return this.model
      .deleteMany({
        _id: { $in: _idArr },
      })
      .exec();
  }
}
